import express from "express";
const router = express.Router();
import Review from "../models/Review";
import moment from "moment";
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const post = await Review.create({
      reviewed_at: moment().format("YYYY/ MM/ D h:mm a"),
      review: req.body.review,
      post_information_id: req.body.post_information_id,
      user: req.body.user,
      user_id: req.body.user_id,
      user_birth_place: req.body.user_birth_place,
    });
    res.send(post);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:pageID", async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        post_information_id: [req.params.pageID],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(reviewData);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Review.destroy({
      where: {
        id: req.body.id,
      },
    }).then(() => {
      res.send("delete comment");
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
