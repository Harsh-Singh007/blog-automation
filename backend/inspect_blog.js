const axios = require('axios');
const cheerio = require('cheerio');

async function inspect() {
    try {
        const { data } = await axios.get('https://beyondchats.com/blogs/');
        const $ = cheerio.load(data);

        // Log pagination links
        const links = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            const text = $(el).text().trim();
            if (href && href.includes('/page/')) {
                links.push({ text, href });
            }
        });
        console.log('Pagination Links:', links);

        // Log article selectors
        // Usually blogs have <article> or .post or .entry
        const articles = [];
        $('.post, article, .blog-post').each((i, el) => { // Generic selectors guess
            articles.push($(el).prop('tagName') + '.' + $(el).attr('class'));
        });
        console.log('Article Elements found:', articles.slice(0, 5));

    } catch (e) {
        console.error(e);
    }
}

inspect();
