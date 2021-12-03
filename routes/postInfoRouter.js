const express = require("express");
const router = express.Router();
const PostInfo = require("../models/PostInfos.js");
const moment = require("moment");
const { route } = require("./userFavoritePagesRouter.js");
router.use(express.json());

// 作成された順に並び替えて送る
router.get("/", async (req, res) => {
  const page = req.query.page_number;
  const perPage = 10;
  const get = await PostInfo.findAndCountAll({
    offset: (page - 1) * perPage,
    limit: perPage,
    order: [["createdAt", "DESC"]],
  });
  res.json(get);
});

// 作成された順に並び替えて送る
router.get("/sort_favorite", async (req, res) => {
  const page = req.query.page_number;
  const perPage = 10;
  const get = await PostInfo.findAndCountAll({
    offset: (page - 1) * perPage,
    limit: perPage,
    order: [["favorites", "DESC"]],
  });
  res.json(get);
});

// post_infoへ投稿
router.post("/", async (req, res) => {
  const post = await PostInfo.create({
    genre: req.body.genre,
    place_name: req.body.place_name,
    prefecture: req.body.prefecture,
    post_number: req.body.post_number,
    address: req.body.address,
    apeal_point: req.body.apeal_point,
    recommendation: req.body.recommendation,
    image: req.body.image,
    post_user: req.body.post_user,
    post_history_id: req.body.post_history_id,
    user_id: req.body.user_id,
    favorites: req.body.favorites,
    img_original_url: req.body.img_original_url,
    posted_at: moment().format("YYYY/ MM/ D"),
  })
    .then(() => {
      res.send("post_info send ok!");
    })
    .catch((err) => {
      throw err;
    });
});

// 検索機能
router.get("/search", async (req, res) => {
  const page = req.query.page_number;
  const perPage = 10;
  const pageData = await PostInfo.findAndCountAll({
    where: {
      prefecture: [req.query.prefecture],
      genre: [req.query.genre],
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    order: [["createdAt", "DESC"]],
  });
  res.json(pageData);
});

// 検索機能(お気に入り順にソート)
router.get("/search/sort_favorite", async (req, res) => {
  const page = req.query.page_number;
  const perPage = 10;
  const pageData = await PostInfo.findAndCountAll({
    where: {
      prefecture: [req.query.prefecture],
      genre: [req.query.genre],
    },
    offset: (page - 1) * perPage,
    limit: perPage,
    order: [["favorites", "DESC"]],
  });
  res.json(pageData);
});

router.get("/information/:pageID", async (req, res) => {
  const pageData = await PostInfo.findOne({
    where: {
      id: [req.params.pageID],
    },
  });
  res.json(pageData);
});

// マイページ用情報
router.get("/userPostInfo", async (req, res) => {
  const pageData = await PostInfo.findAll({
    where: {
      user_id: [req.query.userID],
    },

    order: [["createdAt", "DESC"]],
  });
  res.json(pageData);
});

// お気に入り数追加
router.put("/favorite", async (req, res) => {
  await PostInfo.update(
    {
      favorites: req.body.favorites,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then(() => {
      console.log("ok favorite update");
    })
    .catch((err) => {
      console.log(err);
    });
});

// 自分が投稿した記事の編集
router.put("/edit", async (req, res) => {
  await PostInfo.update(
    {
      genre: req.body.genre,
      place_name: req.body.place_name,
      prefecture: req.body.prefecture,
      post_number: req.body.post_number,
      address: req.body.address,
      apeal_point: req.body.apeal_point,
      recommendation: req.body.recommendation,
      image: req.body.image,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.send("ok information update");
    })
    .catch((err) => {
      console.log(err);
    });
});

// 記事の削除
router.delete("/", async (req, res) => {
  await PostInfo.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.send("Information deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
