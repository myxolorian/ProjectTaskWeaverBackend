const DetailTaskFileRepo = require('../repo/DetailTaskFileRepo');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bxtiqeozrktaytqmjxef.supabase.co';
const supabaseKey = 'sb_publishable_FefT7SeAW6B-NQWFxNIC-g_VbjXXVe9';
const supabase = createClient(supabaseUrl, supabaseKey);

class DetailTaskFileService {

    static async UploadAndInsertFile(fileBuffer, originalName, mimeType, detail_task_id, uploaded_by, group_id) {
        if (!fileBuffer || !detail_task_id || !uploaded_by || !group_id) {
            return { isSuccess: false, pesan: 'File dan data pelengkap wajib diisi!' };
        }

        try {
            const uniqueFileName = `${Date.now()}_${originalName.replace(/\s+/g, '_')}`;

            const { data, error } = await supabase.storage
                .from('DetailTaskFile')
                .upload(uniqueFileName, fileBuffer, {
                    contentType: mimeType,
                    upsert: false
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from('DetailTaskFile')
                .getPublicUrl(uniqueFileName);

            const file_url = publicUrlData.publicUrl;

            const result = await DetailTaskFileRepo.InsertDetailTaskFile(detail_task_id, uploaded_by, originalName, file_url, group_id);

            if (result.status === 'Success') {
                return { isSuccess: true, pesan: result.pesan, file_url: file_url };
            } else {
                return { isSuccess: false, pesan: result.pesan };
            }

        } catch (err) {
            console.error("Error di Service TaskFile (Upload):", err.message);
            throw err;
        }
    }

    static async GetTaskFilesByGroup(group_id) {
        if (!group_id) return { isSuccess: false, pesan: 'group_id wajib diisi!' };

        try {
            const data = await DetailTaskFileRepo.GetTaskFilesByGroup(group_id);
            return { isSuccess: true, data: data };
        } catch (err) {
            console.error("Error di Service TaskFile (GetByGroup):", err.message);
            throw err;
        }
    }
}

module.exports = DetailTaskFileService;