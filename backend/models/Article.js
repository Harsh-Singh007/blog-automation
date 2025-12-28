const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    original_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    published_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_updated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    updated_content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    reference_links: {
        type: DataTypes.JSON, // Store as JSON array
        allowNull: true
    }
});

module.exports = Article;
