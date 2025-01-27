/*
*
* [ SCRAPE DRIVENIME ]
* Created By Hann
* 
* Channel: https://whatsapp.com/channel/0029Vaf07jKCBtxAsekFFk3i
*
**/

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (handler) => {

  handler.add({
    cmd: ["dnime"],
    cats: "Anime",
    alias: "Cari Anime",
    desc: "Mencari istri idaman",

    run: async ({ m, text }) => {
      if (!text) return m.reply("Anime apa yang ingin dicari?");
      const dsearch = await drivenimeSearch(text);

      const objToStr = (obj) => {
        return Array.isArray(obj) ?
          Object.entries(obj).map(([k, n]) => {
            if (typeof n == "object") {
              return objToStr(n)
            } else {
              return `${k}: ${n}`
            };
          }).join("\n")
          :
          obj.map(v => Object.entries(v).map(([k, n]) => {
            if (typeof n == "object") {
              return objToStr(n)
            } else {
              return `${k}: ${n}`
            };
          }).join("\n")).join("\n\n")
      }

      await m.reply(objToStr(dsearch));
    }
  })

}

async function drivenimeSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://drivenime.com/?s=' + query);
      const $ = cheerio.load(data);
      const results = [];

      for (let element of $('.post.excerpt')) {
        const title = $(element).find('.title a').text();
        const link = $(element).find('.title a').attr('href');
        const image = $(element).find('.featured-thumbnail img').attr('src');
        const description = $(element).find('.post-content').text().trim();
        const genre = $(element).find('.theauthor').text().replace('Genre: ', '').trim();
        const date = $(element).find('.thetime').text().trim();

        results.push({
          title,
          link,
          image,
          description,
          genre,
          date
        });
      };

      resolve(results)
    } catch (error) {
      reject(error.message);
    }
  })
}

async function drivenimeDetail(urls) {
  try {
    const { data } = await axios.get(urls);
    const $ = cheerio.load(data);

    const title = $('.title.single-title').text().trim();
    const author = $('.theauthor a').text().trim();
    const date = $('.thetime').text().trim();
    const category = $('.thecategory a').text().trim();
    const image = $('#Info img').attr('src');

    const info = {};
    $('#Info table tbody tr').each((index, element) => {
      const key = $(element).find('.tablex').text().trim().replace(':', '');
      const value = $(element).find('td').last().text().trim();
      info[key] = value;
    });

    const episodes = [];
    $('h4').each((index, element) => {
      const episodeTitle = $(element).text().trim();
      const links = [];
      $(element).next('ul').find('li').each((i, el) => {
        const quality = $(el).find('strong').text().trim();
        const downloadLinks = [];
        $(el).find('a').each((j, link) => {
          const url = $(link).attr('href');
          const provider = $(link).text().trim();
          downloadLinks.push({ provider, url });
        });
        links.push({ quality, downloadLinks });
      });
      episodes.push({ episodeTitle, links });
    });

    const result = {
      title,
      author,
      date,
      category,
      image,
      info,
      episodes
    };

    return JSON.stringify(result, null, 2);
  } catch (error) {
    return error.message;
  }
}