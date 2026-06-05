const FileBigTaskRepo = require('../repo/FileBigTaskRepo');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bxtiqeozrktaytqmjxef.supabase.co';
const supabaseKey = 'sb_publishable_FefT7SeAW6B-NQWFxNIC-g_VbjXXVe9';
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET = 'BigTaskFile';

class FileBigTaskService {
    static async UploadAndInsertFile(fileBuffer, originalName, mimeType, task_id) {
        if (!fileBuffer || !task_id) {
            return { isSuccess: false, pesan: 'File dan task_id wajib diisi!' };
        }
        try {
            const uniqueFileName = `${Date.now()}_${originalName.replace(/\s+/g, '_')}`;

            const { error } = await supabase.storage
                .from(BUCKET)
                .upload(uniqueFileName, fileBuffer, { contentType: mimeType, upsert: false });
            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(uniqueFileName);
            const file_url = publicUrlData.publicUrl;

            const result = await FileBigTaskRepo.InsertFileBigTask(task_id, originalName, file_url);
            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan, file_url };
            }
            return { isSuccess: false, pesan: result.pesan };
        } catch (err) {
            console.error("Error di Service FileBigTask (Upload):", err.message);
            throw err;
        }
    }

    static async GetFilesByTask(task_id) {
        if (!task_id) return { isSuccess: false, pesan: 'task_id wajib diisi!' };
        try {
            const data = await FileBigTaskRepo.GetFileBigTaskByTask(task_id);
            return { isSuccess: true, data };
        } catch (err) {
            console.error("Error di Service FileBigTask (GetByTask):", err.message);
            throw err;
        }
    }

    static async GetFilesByGroup(group_id) {
        if (!group_id) return { isSuccess: false, pesan: 'group_id wajib diisi!' };
        try {
            const data = await FileBigTaskRepo.GetFileBigTaskByGroup(group_id);
            return { isSuccess: true, data };
        } catch (err) {
            console.error("Error di Service FileBigTask (GetByGroup):", err.message);
            throw err;
        }
    }

    static async DeleteFile(file_id) {
        if (!file_id) return { isSuccess: false, pesan: 'file_id wajib diisi!' };
        try {
            const result = await FileBigTaskRepo.DeleteFileBigTask(file_id);
            if (result.status === 'Success') return { isSuccess: true, pesan: result.pesan };
            return { isSuccess: false, pesan: result.pesan };
        } catch (err) {
            console.error("Error di Service FileBigTask (Delete):", err.message);
            throw err;
        }
    }
}

module.exports = FileBigTaskService;
