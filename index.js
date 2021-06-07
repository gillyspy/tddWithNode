const app = require('./src/app');


const sequelize = require('./src/config/database.js');

sequelize.sync();

app.listen(3030, () => {
  console.log('app is running');
});
