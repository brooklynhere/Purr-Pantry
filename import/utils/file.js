export function GetFilename(filePath) {
    return filePath.split('/').at(-1).split('.').at('-2');
}

export function GetFilenameWithExtension(filePath) {
    return filePath.split('/').at(-1);
}

export function Urlize(filePath) {
    return filePath.split('/').at(-1).split('.').at(-2).toLowerCase().split(' ').join('-');
}