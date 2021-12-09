const express = require("express");
// eslint-disable-next-line no-unused-vars
const req = require("express/lib/request");
const Sequelize = require("sequelize");
const router = express.Router();
const UserFavoritePages = require("../models/UserFavoritePage");

router.use(express.json());

// お気に入りした記事を格納
router.post("/", async (req, res) => {
  const post = await UserFavoritePages.create({
    user_id: req.body.user_id,
    favorite_page_id: req.body.favorite_page_id,
  })
    .then(() => {
      res.send("post_favorite ok!!");
    })
    .catch((err) => {
      throw err;
    });
});

// ユーザーがお気に入り登録しているかチェック
router.get("/", async (req, res) => {
  const userFavorite = await UserFavoritePages.findOne({
    where: {
      user_id: [req.query.user_id],
      favorite_page_id: [req.query.favorite_page_id],
    },
  });
  res.send(userFavorite);
});

// お気に入り解除
router.delete("/", async (req, res) => {
  const deleteFavorite = await UserFavoritePages.destroy({
    where: {
      user_id: req.body.user_id,
      favorite_page_id: req.body.favorite_page_id,
    },
  }).then(() => {
    res.send("delete favorite data");
  });
});

// お気に入りしたページ番号を返す
router.get("/page_number", async (req, res) => {
  const getPageNumber = await UserFavoritePages.findAll({
    where: {
      user_id: req.query.userID,
    },
    attributes: [["favorite_page_id", "favoritePageId"]],
  })
    .then((getPageNumber) => {
      res.send(getPageNumber);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/page_delete", async (req, res) => {
  await UserFavoritePages.destroy({
    where: {
      favorite_page_id: req.body.favorite_page_id,
    },
  }).then(() => {
    res.send("delete page");
  });
});

router.get("/favorite_number", async (req, res) => {
  console.log(req.query.favorite_page_id);
  const result = await UserFavoritePages.findAll({
    where: {
      favorite_page_id: req.query.favorite_page_id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
