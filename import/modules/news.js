import moment from 'moment';
import { GetDataID } from "./files.js";
import {GetFilename, Urlize} from "./../utils/file.js";

export async function Save(jsonData, filePath, knex) {

  await knex('news').del()
    .then(() => console.log('Deleted all news rows'))
    .catch(e => console.log(e));

  console.log({
    status:   jsonData.hasOwnProperty('draft') ? (jsonData.draft ? 'draft' : 'published') : 'published',
    author:   jsonData?.author || 'Purr & Pantry',
    content:  jsonData?.content || null,
    date:     jsonData?.publishDate ? new Date(moment(jsonData.publishDate).toISOString()) : null,
    image:    jsonData?.image ? await GetDataID(jsonData.image, knex) : null,
    image_position: jsonData?.image_position || 'center center',
    title:    jsonData?.title || GetFilename(filePath),
    full_title:    jsonData?.full_title || GetFilename(filePath),
    url:      jsonData?.url || Urlize(filePath),
    tags:     jsonData?.seo?.key_words || null,
    seo_title: jsonData?.seo?.seo_title || null,
    description: jsonData?.seo?.description || null
  })
  await knex('news').insert({
    status:   jsonData.hasOwnProperty('draft') ? (jsonData.draft ? 'draft' : 'published') : 'published',
    author:   jsonData?.author || 'Purr & Pantry',
    content:  jsonData?.content || null,
    date:     jsonData?.publishDate ? new Date(moment(jsonData.publishDate).toISOString()) : null,
    image:    jsonData?.image ? await GetDataID(jsonData.image, knex) : null,
    image_position: jsonData?.image_position || 'center center',
    title:    jsonData?.title || GetFilename(filePath),
    full_title:    jsonData?.full_title || GetFilename(filePath),
    url:      jsonData?.url || Urlize(filePath),
    // tags:     jsonData?.seo?.key_words.length > 0 ? jsonData?.seo?.key_words.length : null,
    tags: jsonData?.seo?.key_words.length > 0 ? JSON.stringify(jsonData?.seo?.key_words) : null,
    seo_title: jsonData?.seo?.seo_title || null,
    description: jsonData?.seo?.description || null
  })
    .then(() => console.log('News inserted'))
    .catch(e => console.log(e));
}
