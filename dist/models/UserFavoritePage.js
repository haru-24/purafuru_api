"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../../config/config.json")[env];
const sequelize = new sequelize_1.Sequelize(
  process.env.DATABASE_URL || config.use_env_variable,
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    timezone: "+09:00",
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
      type: sequelize_1.DataTypes.INTEGER,
    },
    user_id: {
      type: sequelize_1.DataTypes.INTEGER,
    },
    favorite_page_id: {
      type: sequelize_1.DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
  }
);
exports.default = UserFavoritePages;
