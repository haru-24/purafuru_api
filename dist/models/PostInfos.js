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
const PostInfo = sequelize.define("post_infos", {
  // Userテーブル
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize_1.DataTypes.INTEGER,
  },
  genre: {
    type: sequelize_1.DataTypes.STRING,
  },
  place_name: {
    type: sequelize_1.DataTypes.STRING,
  },
  prefecture: {
    type: sequelize_1.DataTypes.STRING,
  },
  post_number: {
    type: sequelize_1.DataTypes.STRING,
  },
  address: {
    type: sequelize_1.DataTypes.STRING,
  },
  apeal_point: {
    type: sequelize_1.DataTypes.STRING,
  },
  recommendation: {
    type: sequelize_1.DataTypes.STRING,
  },
  image: {
    type: sequelize_1.DataTypes.STRING,
  },
  post_user: {
    type: sequelize_1.DataTypes.STRING,
  },
  post_history_id: {
    type: sequelize_1.DataTypes.INTEGER,
  },
  user_id: {
    type: sequelize_1.DataTypes.INTEGER,
  },
  favorites: {
    type: sequelize_1.DataTypes.INTEGER,
  },
  posted_at: {
    type: sequelize_1.DataTypes.STRING,
  },
  img_original_url: {
    type: sequelize_1.DataTypes.STRING,
  },
});
exports.default = PostInfo;
