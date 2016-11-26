import cheerio from 'cheerio';
import strings from './strings';


export default (html, debug = false) => {
  const log = (...args) => (debug ? console.log(...args) : null);

  const $ = cheerio.load(html);

  const titles = $('title').toArray().map(el => $(el).text().trim());
  const title = strings(titles);
  const length = html.length;

  const descriptions = $('meta[name=description]').toArray().map(el => $(el).attr('content').trim());
  log(descriptions);
  const description = strings(descriptions);

  log({ length, title, description });
  return { length, title, description };
};
