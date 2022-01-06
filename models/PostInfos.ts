import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "production";
const config = require("~/config/config.json")[env];
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

const PostInfo = sequelize.define("post_infos", {
  // Userテーブル
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  genre: {
    type: DataTypes.STRING,
  },
  place_name: {
    type: DataTypes.STRING,
  },
  prefecture: {
    type: DataTypes.STRING,
  },
  post_number: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  apeal_point: {
    type: DataTypes.STRING,
  },
  recommendation: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  post_user: {
    type: DataTypes.STRING,
  },
  post_history_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  favorites: {
    type: DataTypes.INTEGER,
  },
  posted_at: {
    type: DataTypes.STRING,
  },
  img_original_url: {
    type: DataTypes.STRING,
  },
});

export default PostInfo;
