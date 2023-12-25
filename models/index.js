const Sequelize = require("sequelize");
const User = require("./User");
const Vote = require("./Vote")

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password
);

db.sequelize = sequelize;

db.User = User;
db.Vote = Vote;

User.initiate(sequelize);
Vote.initiate(sequelize);

User.associate(db);
Vote.associate(db);

module.exports = db;