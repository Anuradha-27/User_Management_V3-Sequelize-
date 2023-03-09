const dbConfig = require("../Config/db.config");
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging:false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({force:false})
  .then(() => {
    console.log("server connected to databse");
  })
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });

//   db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

db.user = require("./userModel")(sequelize,DataTypes);
db.state = require("./stateModel")(sequelize, DataTypes);

db.user.hasOne(db.state,{
    foreignKey: 'u_id'
})

module.exports = db;