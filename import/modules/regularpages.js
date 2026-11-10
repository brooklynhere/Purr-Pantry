import moment from 'moment';
import { GetDataID } from "./files.js";
import {GetFilename, Urlize} from "./../utils/file.js";

export async function Save(jsonData, filePath, knex) {

  await knex('regular_pages').del()
    .then(() => console.log('Deleted all regular page rows'))
    .catch(e => console.log(e));

  await knex('regular_pages').insert({
    status:   jsonData.hasOwnProperty('draft') ? (jsonData.draft ? 'draft' : 'published') : 'published',
    author:   jsonData?.author || 'K3 Seeds',
    content:  jsonData?.content || null,
    date:     jsonData?.publishDate ? new Date(moment(jsonData.publishDate).toISOString()) : null,
    image:    jsonData?.image ? await GetDataID(jsonData.image, knex) : null,
    image_position: jsonData?.image_position || 'center center',
    banner_image: jsonData?.image_banner ? await GetDataID(jsonData.image_banner, knex) : null,
    banner_image_position: jsonData?.image_banner_position || 'center center',
    title:    jsonData?.title || GetFilename(filePath),
    url:      jsonData?.url || Urlize(filePath),
    display_image: jsonData.hasOwnProperty('display_image') ? jsonData.display_image : null,
    display_document: jsonData.hasOwnProperty('display_document') ? jsonData.display_document : null,
    feature_page: jsonData.hasOwnProperty('feature_page') ? jsonData.feature_page : null,
    document: jsonData?.document || null,
  })
    .then(() => console.log('Regular page inserted'))
    .catch(e => console.log(e));
}
