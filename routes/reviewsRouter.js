const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const moment = require("moment");
router.use(express.json());

router.post("/", async (req, res) => {
  const post = await Review.create({
    reviewed_at: moment().format("YYYY/ MM/ D h:mm a"),
    review: req.body.review,
    post_information_id: req.body.post_information_id,
    user: req.body.user,
    user_id: req.body.user_id,
    user_birth_place: req.body.user_birth_place,
  })
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/:pageID", async (req, res) => {
  const reviewData = await Review.findAll({
    where: {
      post_information_id: [req.params.pageID],
    },
    order: [["createdAt", "DESC"]],
  });
  res.json(reviewData);
});

module.exports = router;
