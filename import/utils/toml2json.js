import toml from 'toml';
import YAML from 'yaml';
import fs from 'fs/promises';




async function yamlToJson(rawData) {
    let jsonData = {};
    const firstIndexPlusPlus = rawData.findIndex(element => element === "---") 
    const lastIndexPlusPlus = rawData.findLastIndex(element => element === "---")

    // get front matter vars
    let fmtVars = rawData.slice(firstIndexPlusPlus + 1, lastIndexPlusPlus);
    fmtVars = fmtVars.join('\n');

    // get content 
    let content = rawData.slice(lastIndexPlusPlus + 1);

    // final json format
    jsonData = { ...(YAML.parse(fmtVars)) }
    jsonData['content'] = content.join('\n');
    return jsonData;
}





async function tomlToJson(rawData) {
    let jsonData = {};
    const firstIndexPlusPlus = rawData.findIndex(element => element === "+++") 
    const lastIndexPlusPlus = rawData.findLastIndex(element => element === "+++")

    // get front matter vars
    let fmtVars = rawData.slice(firstIndexPlusPlus + 1, lastIndexPlusPlus);
    fmtVars = fmtVars.join('\n');

    // get content 
    let content = rawData.slice(lastIndexPlusPlus + 1);

    // final json format
    jsonData = { ...(toml.parse(fmtVars)) }
    jsonData['content'] = content.join('\n');
    return jsonData;
}




export async function Parser(filePath) {
    console.log(`Start parsing ${filePath}`);
    let rawData = "";
    let jsonData = {};

    rawData = await fs.readFile(filePath, {encoding: "utf-8"});

    if(!rawData) {
        return {};
    } else {
        rawData = rawData.split('\n');

        if(rawData[0] === '---') {
            // yaml to json
            console.log('Converting YAML to JSON');
            return yamlToJson(rawData);
        } else if(rawData[0] === '+++') {
            // toml to json
            console.log('Converting TOML to JSON');
            return tomlToJson(rawData);
        } else {
            console.log('Format cannot be determined. Parser failed');
            return;
        }
    }
}
  