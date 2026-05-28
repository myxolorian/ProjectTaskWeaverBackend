const { GoogleGenerativeAI } = require('@google/generative-ai');
const DetailTaskRepo = require('../repo/DetailTaskRepo');
const { pool } = require('../config/db');
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
async function getGroupMembersWithSkills(group_id) {
    const query = `SELECT * FROM get_enrollment($1)`;
    const result = await pool.query(query, [group_id]);
    return result.rows; // { user_id, user_full_name, user_role, user_email, user_skill }
}
 
function parseSkills(user_skill) {
    if (!user_skill) return [];
    try {
        const arr = JSON.parse(user_skill);
        return arr.map(s => `${s.name} (${s.category}, ${s.level})`);
    } catch {
        return [user_skill];
    }
}
 
class AIController {
 
    static async BreakdownTask(req, res) {
        const { task_id, group_id, task_title, task_description, task_deadline, complexity_score } = req.body;
 
        if (!task_id || !group_id || !task_title || !task_description || !task_deadline) {
            return res.status(400).json({ status: "gagal", pesan: "task_id, group_id, task_title, task_description, task_deadline wajib diisi!" });
        }
 
        try {
            // 1. Ambil members + skill
            const members = await getGroupMembersWithSkills(group_id);
            if (!members || members.length === 0) {
                return res.status(400).json({ status: "gagal", pesan: "Tidak ada member di group ini!" });
            }
 
            // 2. Format member list untuk prompt
            const memberList = members.map(m => {
                const skills = parseSkills(m.user_skill);
                return `- ${m.user_full_name} (ID: ${m.user_id}, Role: ${m.user_role}, Skills: ${skills.length > 0 ? skills.join(', ') : 'Tidak ada skill terdaftar'})`;
            }).join('\n');
 
            // 3. Buat prompt Gemini
            const prompt = `
Kamu adalah AI task manager yang bertugas memecah sebuah task besar menjadi subtask-subtask kecil dan mengassign ke anggota tim secara MERATA berdasarkan skill mereka.
 
TASK BESAR:
- Judul: ${task_title}
- Deskripsi: ${task_description}
- Deadline: ${task_deadline}
- Tingkat Kesulitan (1-10): ${complexity_score || 5}
 
ANGGOTA TIM:
${memberList}
 
INSTRUKSI:
1. Buat 3 sampai ${Math.min(members.length * 2, 8)} subtask yang logis dan spesifik dari task di atas.
2. Assign setiap subtask ke anggota yang paling cocok berdasarkan skillnya.
3. Distribusikan workload MERATA - jangan satu orang dapat terlalu banyak subtask.
4. Deadline subtask harus SEBELUM atau SAMA DENGAN deadline task besar: ${task_deadline}.
5. Gunakan deadline yang realistis dan bertahap (subtask awal deadline lebih awal).
 
Balas HANYA dengan JSON array berikut, tanpa penjelasan, tanpa markdown:
[
  {
    "detail_task_name": "nama subtask spesifik",
    "assigned_user_id": 123,
    "assigned_user_name": "Nama Member",
    "detail_task_deadline": "2026-06-01T23:59:00"
  }
]
`;
 
            // 4. Call Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const geminiResult = await model.generateContent(prompt);
            const rawText = geminiResult.response.text().trim();
 
            // 5. Parse JSON dari Gemini
            let subtasks;
            try {
                const cleaned = rawText.replace(/```json|```/g, '').trim();
                subtasks = JSON.parse(cleaned);
            } catch (parseErr) {
                console.error("Gagal parse response Gemini:", rawText);
                return res.status(500).json({ status: "error", pesan: "AI response tidak valid, coba lagi." });
            }
 
            // 6. Insert semua subtask ke DB
            const insertResults = [];
            for (const sub of subtasks) {
                try {
                    const insertResult = await DetailTaskRepo.InsertDetailTask(
                        task_id,
                        sub.assigned_user_id,
                        sub.detail_task_name,
                        sub.detail_task_deadline
                    );
                    insertResults.push({
                        ...sub,
                        status: insertResult.status,
                        pesan: insertResult.pesan
                    });
                } catch (insertErr) {
                    console.error(`Gagal insert subtask "${sub.detail_task_name}":`, insertErr.message);
                    insertResults.push({ ...sub, status: 'Error', pesan: insertErr.message });
                }
            }
 
            const successCount = insertResults.filter(r => r.status === 'Success').length;
 
            res.status(201).json({
                status: "sukses",
                pesan: `${successCount} dari ${subtasks.length} subtask berhasil dibuat`,
                data: insertResults
            });
 
        } catch (err) {
            console.error("Error di AIController (BreakdownTask):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server: " + err.message });
        }
    }
 
    // POST /api/taskRebalance
    // Body: { task_id, group_id, task_title, task_description, task_deadline }
    // Fungsi: redistribute subtask yang belum selesai (todo/in-progress) ke member yang masih aktif
    static async RebalanceTask(req, res) {
        const { task_id, group_id, task_title, task_description, task_deadline } = req.body;
 
        if (!task_id || !group_id || !task_title) {
            return res.status(400).json({ status: "gagal", pesan: "task_id, group_id, task_title wajib diisi!" });
        }
 
        try {
            // 1. Ambil subtask yang belum selesai
            const allSubtasks = await DetailTaskRepo.GetDetailTasksByTask(task_id);
            const unfinished = allSubtasks.filter(s =>
                s.DetailTaskStatus !== 'completed' && s.DetailTaskStatus !== 'C'
            );
 
            if (unfinished.length === 0) {
                return res.status(200).json({ status: "sukses", pesan: "Semua subtask sudah selesai, tidak perlu rebalance!" });
            }
 
            // 2. Ambil members aktif di group
            const members = await getGroupMembersWithSkills(group_id);
            if (!members || members.length === 0) {
                return res.status(400).json({ status: "gagal", pesan: "Tidak ada member aktif di group ini!" });
            }
 
            // 3. Hitung workload saat ini per member
            const workloadMap = {};
            members.forEach(m => { workloadMap[m.user_id] = 0; });
            allSubtasks.forEach(s => {
                if (s.DetailTaskStatus !== 'completed' && workloadMap[s.UserId] !== undefined) {
                    workloadMap[s.UserId]++;
                }
            });
 
            const memberList = members.map(m => {
                const skills = parseSkills(m.user_skill);
                return `- ${m.user_full_name} (ID: ${m.user_id}, Skills: ${skills.length > 0 ? skills.join(', ') : 'Tidak ada skill'}, Workload saat ini: ${workloadMap[m.user_id] || 0} subtask)`;
            }).join('\n');
 
            const unfinishedList = unfinished.map(s =>
                `- ID: ${s.DetailTaskId}, Nama: "${s.DetailTaskName}", Deadline: ${s.DetailTaskDeadline}`
            ).join('\n');
 
            // 4. Prompt rebalance ke Gemini
            const prompt = `
Kamu adalah AI task manager. Ada subtask-subtask yang perlu di-redistribute karena workload tidak merata atau ada member yang sudah keluar.
 
TASK BESAR: ${task_title}
DESKRIPSI: ${task_description || '-'}
DEADLINE TASK: ${task_deadline}
 
SUBTASK YANG BELUM SELESAI (perlu di-assign ulang):
${unfinishedList}
 
MEMBER AKTIF + SKILL + WORKLOAD SAAT INI:
${memberList}
 
INSTRUKSI:
1. Assign ulang semua subtask di atas ke member yang aktif.
2. Distribusikan MERATA - perhatikan workload saat ini tiap member.
3. Prioritaskan assign ke member yang skillnya paling relevan.
4. Jangan ubah deadline subtask kecuali sudah lewat (gunakan deadline lama kalau masih valid).
 
Balas HANYA dengan JSON array berikut, tanpa penjelasan, tanpa markdown:
[
  {
    "detail_task_id": 456,
    "detail_task_name": "nama subtask",
    "new_user_id": 123,
    "new_user_name": "Nama Member",
    "detail_task_deadline": "2026-06-01T23:59:00"
  }
]
`;
 
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const geminiResult = await model.generateContent(prompt);
            const rawText = geminiResult.response.text().trim();
 
            let rebalanced;
            try {
                const cleaned = rawText.replace(/```json|```/g, '').trim();
                rebalanced = JSON.parse(cleaned);
            } catch (parseErr) {
                console.error("Gagal parse response Gemini (Rebalance):", rawText);
                return res.status(500).json({ status: "error", pesan: "AI response tidak valid, coba lagi." });
            }
 
            // 5. Update assignment di DB
            const updateResults = [];
            for (const sub of rebalanced) {
                try {
                    await pool.query(
                        `UPDATE tr_detail_task SET user_id = $1, detail_task_deadline = $2, audited_time = now() WHERE detail_task_id = $3`,
                        [sub.new_user_id, sub.detail_task_deadline, sub.detail_task_id]
                    );
                    updateResults.push({ ...sub, status: 'Success' });
                } catch (updateErr) {
                    console.error(`Gagal update subtask ID ${sub.detail_task_id}:`, updateErr.message);
                    updateResults.push({ ...sub, status: 'Error', pesan: updateErr.message });
                }
            }
 
            const successCount = updateResults.filter(r => r.status === 'Success').length;
 
            res.status(200).json({
                status: "sukses",
                pesan: `${successCount} subtask berhasil di-rebalance`,
                data: updateResults
            });
 
        } catch (err) {
            console.error("Error di AIController (RebalanceTask):", err.message);
            res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server: " + err.message });
        }
    }
}
 
module.exports = AIController;