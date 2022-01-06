import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../config/config.json")[env];
const sequelize = new Sequelize(
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
      type: DataTypes.INTEGER,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    birth_place: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
  }
);

export default Users;
