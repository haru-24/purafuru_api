"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postInfoRouter_1 = __importDefault(require("./routes/postInfoRouter"));
const reviewsRouter_1 = __importDefault(require("./routes/reviewsRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const userFavoritePagesRouter_1 = __importDefault(require("./routes/userFavoritePagesRouter"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("hello from express!!!");
}));
app.use("/post_info", postInfoRouter_1.default);
app.use("/review", reviewsRouter_1.default);
app.use("/users", usersRouter_1.default);
app.use("/user_favorite", userFavoritePagesRouter_1.default);
app.listen(PORT, () => console.log(`Server Run Port:${PORT}`));
