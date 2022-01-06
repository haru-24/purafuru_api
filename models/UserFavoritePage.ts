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
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    favorite_page_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
  }
);

export default UserFavoritePages;
