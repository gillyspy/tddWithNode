const Sequelize = require('sequelize');
const dbCfg = require('./database.json');

const sequelize = new Sequelize(dbCfg.db,dbCfg.user, dbCfg.pwd,{
  dialect : "sqlite",
  storage : "./database.sqlite",
  logging : false
});

module.exports = sequelize;