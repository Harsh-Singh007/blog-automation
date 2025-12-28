const { Sequelize } = require('sequelize');
const path = require('path');

// In Vercel, we must use /tmp for writing, but data is ephemeral.
const storagePath = process.env.VERCEL
    ? path.join('/tmp', 'database.sqlite')
    : path.join(__dirname, 'database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
});

module.exports = sequelize;
