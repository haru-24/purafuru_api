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
const Users = sequelize.define(
  "users",
  {
    // Userテーブル
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize_1.DataTypes.INTEGER,
    },
    user_name: {
      type: sequelize_1.DataTypes.STRING,
    },
    birth_place: {
      type: sequelize_1.DataTypes.STRING,
    },
    email: {
      type: sequelize_1.DataTypes.STRING,
    },
    password: {
      type: sequelize_1.DataTypes.STRING,
    },
  },
  {
    underscored: true,
  }
);
exports.default = Users;
