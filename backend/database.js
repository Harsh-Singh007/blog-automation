const { Sequelize } = require('sequelize');
const path = require('path');
const sqlite3 = require('sqlite3');

// In Vercel, we must use /tmp for writing, but data is ephemeral.
const storagePath = process.env.VERCEL
    ? path.join('/tmp', 'database.sqlite')
    : path.join(__dirname, 'database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    dialectModule: sqlite3,
    logging: false
});

module.exports = sequelize;
