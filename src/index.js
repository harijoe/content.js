import cheerio from 'cheerio';
import strings from './strings';


export default (html, debug = false) => {
  const log = (...args) => (debug ? console.log(...args) : null);

  const $ = cheerio.load(html);

  const titles = $('title').toArray().map(el => $(el).text().trim());
  const facebookTitles = $('meta[property="og:title"]').toArray().map(el => $(el).attr('content').trim());
  const twitterTitles = $('meta[property="twitter:title"]').toArray().map(el => $(el).attr('content').trim());
  const title = strings(titles.concat(facebookTitles, twitterTitles));
  const length = html.length;

  const descriptions = $('meta[name=description]').toArray().map(el => $(el).attr('content').trim());
  const facebookDescriptions = $('meta[property="og:description"]').toArray().map(el => $(el).attr('content').trim());
  const twitterDescriptions = $('meta[property="twitter:description"]').toArray().map(el => $(el).attr('content').trim());
  const description = strings(descriptions.concat(facebookDescriptions, twitterDescriptions));

  const contentArray = $('article').toArray().map(el => $(el)
    .text()
    .trim());
  // either get the tag article, or retrieve all text in the page
  let content = contentArray.length > 0 ? contentArray.join(' ') : html.replace(/<(?:.|\n)*?>/gm, '');

  content = content
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s\s+/g, ' ')
  ;

  // log(content);
  return { length, title, description, content };
};
