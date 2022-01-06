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
        useUTC: false,
      },
    },
    timezone: "+09:00",
  }
);
const Review = sequelize.define("reviews", {
  // Userテーブル
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize_1.DataTypes.INTEGER,
  },
  user: {
    type: sequelize_1.DataTypes.STRING,
  },
  user_id: {
    type: sequelize_1.DataTypes.INTEGER,
  },
  user_birth_place: {
    type: sequelize_1.DataTypes.STRING,
  },
  reviewed_at: {
    type: sequelize_1.DataTypes.STRING,
  },
  review: {
    type: sequelize_1.DataTypes.STRING,
  },
  post_information_id: {
    type: sequelize_1.DataTypes.STRING,
  },
});
exports.default = Review;
