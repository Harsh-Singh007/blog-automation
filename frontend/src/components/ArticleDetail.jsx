import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!article) return <div>Loading...</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '0.5rem' }}>{article.title}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Published on {new Date(article.published_date).toLocaleDateString()}
            </p>

            <div className="split-view">
                <div>
                    <h2 style={{ color: '#f59e0b' }}>Original Content</h2>
                    <div className="content-box">
                        <div dangerouslySetInnerHTML={{ __html: article.content ? article.content.replace(/\n/g, '<br/>') : 'No content' }} />
                    </div>
                </div>

                <div>
                    <h2 style={{ color: '#10b981' }}>AI Updated Content</h2>
                    {article.is_updated ? (
                        <div className="content-box">
                            <div dangerouslySetInnerHTML={{ __html: article.updated_content }} />

                            {article.reference_links && (
                                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                    <h3>References</h3>
                                    <ul>
                                        {JSON.parse(JSON.stringify(article.reference_links)).map((ref, i) => (
                                            <li key={i}>
                                                <a href={ref.link} target="_blank" rel="noopener noreferrer">{ref.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="content-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)' }}>
                            <p>This article has not been updated by AI yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
