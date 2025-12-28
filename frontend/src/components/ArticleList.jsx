import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/articles');
            setArticles(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center' }}>Loading articles...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Latest Articles</h1>
                <button className="btn" onClick={() => { setLoading(true); axios.get('http://localhost:3000/api/scrape').then(fetchArticles); }}>
                    Trigger Scrape
                </button>
            </div>

            <div className="grid">
                {articles.map(article => (
                    <Link to={`/article/${article.id}`} key={article.id} className="card">
                        <div style={{ marginBottom: '1rem' }}>
                            {article.is_updated ? (
                                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>AI Updated</span>
                            ) : (
                                <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>Original</span>
                            )}
                        </div>
                        <h3>{article.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {new Date(article.published_date).toLocaleDateString()}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {article.content ? article.content.substring(0, 150) + '...' : 'No content preview'}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
