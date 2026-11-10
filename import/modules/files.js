function GetFile(filePath) {
    return filePath.split('/').at(-1);
}

export async function GetDataID(filename, knex) {
    return await knex('directus_files')
            .where('filename_download', GetFile(filename))
            .select('id')
            .first()
            .then(res => {
                console.log(res)
                return res.id || null;
            })
}