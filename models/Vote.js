const Sequelize = require("sequelize");

class Vote extends Sequelize.Model {
  static initiate(sequelize) {
    Vote.init(
      {
        Votenum: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Vote",
        tableName: "Vote",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = Vote;