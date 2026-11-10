import { argv } from 'process';
import knexconfig from './knexfile.js';
import knex from 'knex';
import {Save as NewsSave} from './modules/news.js';
import {Parser} from './utils/toml2json.js';
import fs from 'fs';


console.log("Starting the importer");

if (argv.length > 0 && argv[2]) {

    const module = argv[2].toLowerCase();
    const knexObj = knex(knexconfig['development']);
    // console.log(knexconfig)
    
    let folder = "";
    let file = "";
    let jsonData = {};
    
    switch(module) {
        case 'news':
            console.log('importing news')
            folder = "./../content/articles/";
            fs.readdirSync(folder).forEach(async (file, index) =>  {
                // filter out index.md or _index.md
                if(['index.md', '_index.md'].includes(file))
                    return;
                
                jsonData = await Parser(folder + file);
                await NewsSave(jsonData, file, knexObj);
            }) 
            break;
        default:
            break;
            
    }
} else {
    console.log('Nothing to import')
}

