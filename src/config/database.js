const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const dbCfg = require(`../../config/${env}.json`);

let { db, user, pwd, ...opts } = dbCfg.database;
const sequelize = new Sequelize(db, user, pwd, opts);

module.exports = sequelize;
