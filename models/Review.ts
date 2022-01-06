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

const Review = sequelize.define("reviews", {
  // Userテーブル
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  user: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  user_birth_place: {
    type: DataTypes.STRING,
  },
  reviewed_at: {
    type: DataTypes.STRING,
  },
  review: {
    type: DataTypes.STRING,
  },
  post_information_id: {
    type: DataTypes.STRING,
  },
});

export default Review;
