const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../config/config.json")[env];
const sequelize = new Sequelize(
  process.env.DATABASE_URL || config.use_env_variable,
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const UserFavoritePages = sequelize.define(
  "user_favorite_pages",
  {
    // Userテーブル
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    favorite_page_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    underscored: true,
  }
);
UserFavoritePages.sync({ alter: true });

module.exports = UserFavoritePages;
