const express = require("express");
const app = express();
const cors = require("cors");
const postInfoRouter = require("./routes/postInfoRouter");
const reviewRouter = require("./routes/reviewsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const userFavoritePagesRouter = require("./routes/userFavoritePagesRouter");

const PORT = process.env.PORT || 8888;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("hello from express!!!");
});

app.use("/post_info", postInfoRouter);
app.use("/review", reviewRouter);
app.use("/users", usersRouter);
app.use("/user_favorite", userFavoritePagesRouter);

app.listen(PORT, () => console.log(`Server Run Port:${PORT}`));
