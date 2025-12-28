import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const res = await axios.get(`${apiUrl}/articles/${id}`);
            setArticle(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnhance = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${apiUrl}/articles/${id}/enhance`);
            setArticle(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to enhance article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        if (!window.confirm('Are you sure you want to remove the AI-enhanced version and revert to the original?')) return;
        setLoading(true);
        try {
            const res = await axios.post(`${apiUrl}/articles/${id}/reset`);
            setArticle(res.data);
        } catch (err) {
            console.error(err);
            alert('Failed to reset article.');
        } finally {
            setLoading(false);
        }
    };

    if (!article) return <div className="container" style={{ textAlign: 'center' }}>Loading...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>{article.title}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Published on {new Date(article.published_date).toLocaleDateString()}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {article.is_updated ? (
                        <button
                            className="btn"
                            style={{ background: '#ef4444' }}
                            onClick={handleReset}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Remove Update'}
                        </button>
                    ) : (
                        <button
                            className="btn"
                            onClick={handleEnhance}
                            disabled={loading}
                        >
                            {loading ? 'Enhancing...' : 'Enhance with AI'}
                        </button>
                    )}
                    <button className="btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }} onClick={() => navigate('/')}>Back</button>
                </div>
            </div>

            <div className="split-view">
                <div>
                    <h2 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
                        Original Content
                    </h2>
                    <div className="content-box">
                        <div dangerouslySetInnerHTML={{ __html: article.content ? article.content.replace(/\n/g, '<br/>') : 'No content' }} />
                    </div>
                </div>

                <div>
                    <h2 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                        AI Updated Content
                    </h2>
                    {article.is_updated ? (
                        <div className="content-box">
                            <div dangerouslySetInnerHTML={{ __html: article.updated_content }} />

                            {article.reference_links && (
                                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>References Used</h3>
                                    <ul style={{ paddingLeft: '1.2rem' }}>
                                        {(typeof article.reference_links === 'string' ? JSON.parse(article.reference_links) : article.reference_links).map((ref, i) => (
                                            <li key={i} style={{ marginBottom: '0.5rem' }}>
                                                <a href={ref.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem' }}>{ref.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="content-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                            <p>This article has not been enhanced yet.</p>
                            <p style={{ fontSize: '0.9rem' }}>Click "Enhance with AI" to generate an updated version based on web references.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
