const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Article = require('./models/Article');
const scrapeOldestArticles = require('./scraper');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Sync DB
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Routes
app.get('/api/scrape', async (req, res) => {
    try {
        const articles = await scrapeOldestArticles();
        res.json({ success: true, count: articles.length, articles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/articles', async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [['published_date', 'ASC']] });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/articles', async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        await article.update(req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/articles/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        await article.destroy();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
