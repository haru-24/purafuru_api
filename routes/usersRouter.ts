import express from "express";
const router = express.Router();
import Users from "../models/Users";
import jwt from "jsonwebtoken";
router.use(express.json());
// ハッシュ化を行うミドルウェア
import bcrypt from "bcryptjs";
const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
    await Users.create({
      user_name: req.body.user_name,
      birth_place: req.body.birth_place,
      email: req.body.email,
      password: hashPassword,
    });
    res.send("users post ok!");
  } catch (err) {
    console.log(err);
  }
});

// ログインの処理
router.post("/login", async (req, res) => {
  try {
    const getUserData: any = await Users.findOne({
      where: {
        email: [req.body.email],
      },
    });
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
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  const bearToken = req.headers["authorization"] as string;
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

export default router;
