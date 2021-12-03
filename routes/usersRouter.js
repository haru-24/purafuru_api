const express = require("express");
const router = express.Router();
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");
router.use(express.json());
// ハッシュ化を行うミドルウェア
const bcrypt = require("bcrypt");
const { appendFile } = require("fs");
const { send } = require("process");
const saltRounds = 10;

router.post("/register", async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
  await Users.create({
    user_name: req.body.user_name,
    birth_place: req.body.birth_place,
    email: req.body.email,
    password: hashPassword,
  })
    .then(() => {
      res.send("users post ok!");
    })
    .catch((err) => {
      throw err;
    });
});

// ログインの処理
router.post("/login", async (req, res) => {
  const getUserData = await Users.findOne({
    where: {
      email: [req.body.email],
    },
  })
    .then((getUserData) => {
      if (bcrypt.compareSync(req.body.password, getUserData.password)) {
        const payload = {
          id: getUserData.id,
          user_name: getUserData.user_name,
          email: getUserData.email,
          birth_place: getUserData.birth_place,
        };
        const token = jwt.sign(payload, "secret");
        res.json(token);
      } else {
        res.send("パスワードが違います");
      }
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/login", (req, res) => {
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      return res.json(user);
    }
  });
});

module.exports = router;
