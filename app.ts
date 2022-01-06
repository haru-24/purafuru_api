import express from "express";
import cors from "cors";
import postInfoRouter from "./routes/postInfoRouter";
import reviewRouter from "./routes/reviewsRouter";
import usersRouter from "./routes/usersRouter";
import userFavoritePagesRouter from "./routes/userFavoritePagesRouter";
const PORT = process.env.PORT || 8000;
const app = express();

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
