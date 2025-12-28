const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('./models/Article');

async function scrapeOldestArticles() {
    try {
        console.log('Starting scrape...');
        const baseUrl = 'https://beyondchats.com/blogs/';
        const { data: mainPage } = await axios.get(baseUrl);
        const $ = cheerio.load(mainPage);

        // Find last page
        let maxPage = 1;
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('/page/')) {
                const match = href.match(/\/page\/(\d+)\//);
                if (match) {
                    const pageNum = parseInt(match[1]);
                    if (pageNum > maxPage) maxPage = pageNum;
                }
            }
        });

        console.log(`Found max page: ${maxPage}`);

        let articles = [];
        let page = maxPage;

        while (articles.length < 5 && page > 0) {
            const pageUrl = page === 1 ? baseUrl : `${baseUrl}page/${page}/`;
            console.log(`Fetching page: ${pageUrl}`);
            const { data: pageHtml } = await axios.get(pageUrl);
            const $page = cheerio.load(pageHtml);

            const pageArticles = [];
            // Selector based on inspection: article.entry-card
            $('article.entry-card').each((i, el) => {
                const title = $page(el).find('h2.entry-title a').text().trim(); // Guessing h2.entry-title based on common WP themes
                const link = $page(el).find('h2.entry-title a').attr('href');
                const dateText = $page(el).find('.entry-date').text().trim(); // Guessing

                // If selectors fail, try generic
                const titleFallback = $page(el).find('h2 a').text().trim();
                const linkFallback = $page(el).find('h2 a').attr('href');

                if (titleFallback && linkFallback) {
                    pageArticles.push({
                        title: title || titleFallback,
                        original_url: link || linkFallback,
                        published_date: dateText ? new Date(dateText) : new Date(), // Fallback to now if date not found
                        content: '' // We might need to fetch individual pages for full content, but prompt says "Scrape articles". Usually implies content.
                    });
                }
            });


            pageArticles.reverse();

            for (const art of pageArticles) {
                if (articles.length < 5) {
                    // Fetch full content
                    try {
                        const { data: artHtml } = await axios.get(art.original_url);
                        const $art = cheerio.load(artHtml);
                        // Remove scripts, styles
                        $art('script').remove();
                        $art('style').remove();

                        // Get content. Usually .entry-content or .post-content
                        let content = $art('.entry-content').text().trim();
                        if (!content) content = $art('article').text().trim();

                        art.content = content;
                        articles.push(art);
                    } catch (err) {
                        console.error(`Failed to fetch content for ${art.original_url}: ${err.message}`);
                    }
                }
            }

            page--;
        }

        // Save to DB
        for (const art of articles) {
            await Article.findOrCreate({
                where: { original_url: art.original_url },
                defaults: art
            });
        }

        console.log(`Scraped ${articles.length} articles.`);
        return articles;

    } catch (error) {
        console.error('Scraping failed:', error);
        throw error;
    }
}

module.exports = scrapeOldestArticles;
