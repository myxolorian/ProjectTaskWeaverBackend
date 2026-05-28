require('dotenv').config();

async function cekModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("🔑 Status API Key:", apiKey ? `Terbaca (${apiKey.substring(0, 8)}...)` : "KOSONG!");

    if (!apiKey) {
        console.log("❌ API Key tidak ditemukan di file .env!");
        return;
    }

    try {
        console.log("📡 Mengambil daftar model langsung dari server Google...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("❌ ERROR DARI GOOGLE:", data.error.message);
        } else if (data.models) {
            console.log("\n✅ DAFTAR MODEL YANG BISA KAMU PAKAI:");
            data.models.forEach(m => {
                // Hanya tampilkan model yang bisa dipakai untuk chat/teks
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("❓ Respon tidak dikenal:", data);
        }
    } catch (error) {
        console.error("❌ Gagal menghubungi Google:", error.message);
    }
}

cekModel();