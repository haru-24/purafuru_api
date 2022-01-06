import express from "express";
// eslint-disable-next-line no-unused-vars

const router = express.Router();
import UserFavoritePages from "../models/UserFavoritePage";

router.use(express.json());

// お気に入りした記事を格納
router.post("/", async (req, res) => {
  try {
    const post = await UserFavoritePages.create({
      user_id: req.body.user_id,
      favorite_page_id: req.body.favorite_page_id,
    });
    res.send("post_favorite ok!!");
  } catch (err) {
    console.log(err);
  }
});

// ユーザーがお気に入り登録しているかチェック
router.get("/", async (req, res) => {
  try {
    const userFavorite = await UserFavoritePages.findOne({
      where: {
        user_id: req.query.user_id,
        favorite_page_id: req.query.favorite_page_id,
      },
    });
    res.send(userFavorite);
  } catch (err) {
    console.log(err);
  }
});

// お気に入り解除
router.delete("/", async (req, res) => {
  try {
    await UserFavoritePages.destroy({
      where: {
        user_id: req.body.user_id,
        favorite_page_id: req.body.favorite_page_id,
      },
    });
    res.send("delete favorite data");
  } catch (err) {
    console.log(err);
  }
});

// お気に入りしたページ番号を返す
router.get("/page_number", async (req, res) => {
  try {
    const getPageNumber = await UserFavoritePages.findAll({
      where: {
        user_id: req.query.userID,
      },
      attributes: [["favorite_page_id", "favoritePageId"]],
    });
    res.send(getPageNumber);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/page_delete", async (req, res) => {
  try {
    await UserFavoritePages.destroy({
      where: {
        favorite_page_id: req.body.favorite_page_id,
      },
    });
    res.send("delete page");
  } catch (err) {
    console.log(err);
  }
});

router.get("/favorite_number", async (req, res) => {
  try {
    const result = await UserFavoritePages.findAll({
      where: {
        favorite_page_id: req.query.favorite_page_id,
      },
    });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
