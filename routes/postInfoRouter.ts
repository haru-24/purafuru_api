import express from "express";
import PostInfo from "../models/PostInfos";
import moment from "moment";
const router = express.Router();
router.use(express.json());

// 作成された順に並び替えて送る
router.get("/", async (req, res) => {
  const page = req.query.page_number as string;
  const pageNumber = Number(page);
  const perPage = 10;
  const get = await PostInfo.findAndCountAll({
    offset: (pageNumber - 1) * perPage,
    limit: perPage,
    order: [["createdAt", "DESC"]],
  });
  res.json(get);
});

// 作成された順に並び替えて送る
router.get("/sort_favorite", async (req, res) => {
  const page = req.query.page_number as string;
  const pageNumber = Number(page);
  const perPage = 10;
  const get = await PostInfo.findAndCountAll({
    offset: (pageNumber - 1) * perPage,
    limit: perPage,
    order: [["favorites", "DESC"]],
  });
  res.json(get);
});

// post_infoへ投稿
router.post("/", async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    await PostInfo.create({
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
    });
    res.send("post_info send ok!");
  } catch (err) {
    console.log(err);
  }
});

// 検索機能
router.get("/search", async (req, res) => {
  try {
    const page = req.query.page_number as string;
    const pageNumber = Number(page);
    const perPage = 10;
    const pageData = await PostInfo.findAndCountAll({
      where: {
        prefecture: req.query.prefecture,
        genre: req.query.genre,
      },
      offset: (pageNumber - 1) * perPage,
      limit: perPage,
      order: [["createdAt", "DESC"]],
    });
    res.json(pageData);
  } catch (err) {
    console.log(err);
  }
});

// 検索機能(お気に入り順にソート)
router.get("/search/sort_favorite", async (req, res) => {
  try {
    const page = req.query.page_number as string;
    const pageNumber = Number(page);
    const perPage = 10;
    const pageData = await PostInfo.findAndCountAll({
      where: {
        prefecture: req.query.prefecture,
        genre: req.query.genre,
      },
      offset: (pageNumber - 1) * perPage,
      limit: perPage,
      order: [["favorites", "DESC"]],
    });
    res.json(pageData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/information/:pageID", async (req, res) => {
  try {
    const pageData = await PostInfo.findOne({
      where: {
        id: [req.params.pageID],
      },
    });
    res.json(pageData);
  } catch (err) {
    console.log(err);
  }
});

// マイページ用情報
router.get("/userPostInfo", async (req, res) => {
  try {
    const pageData = await PostInfo.findAll({
      where: {
        user_id: req.query.userID,
      },

      order: [["createdAt", "DESC"]],
    });
    res.json(pageData);
  } catch (err) {
    console.log(err);
  }
});

// お気に入り数追加
router.put("/favorite", async (req, res) => {
  try {
    await PostInfo.update(
      {
        favorites: req.body.favorites,
      },
      {
        where: { id: req.body.id },
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// 自分が投稿した記事の編集
router.put("/edit", async (req, res) => {
  try {
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
    );
    res.send("ok information update");
  } catch (err) {
    console.log(err);
  }
});

// 記事の削除
router.delete("/", async (req, res) => {
  try {
    await PostInfo.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.send("Information deleted");
  } catch (err) {
    console.log(err);
  }
});

// ユーザーがお気に入りしたページを返す
router.get("/favorite_page", async (req, res) => {
  try {
    const result = await PostInfo.findAll({
      where: { id: req.query.pageId },
      order: [["createdAt", "DESC"]],
    });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
