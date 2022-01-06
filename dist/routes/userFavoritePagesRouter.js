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
// eslint-disable-next-line no-unused-vars
const router = express_1.default.Router();
const UserFavoritePage_1 = __importDefault(require("../models/UserFavoritePage"));
router.use(express_1.default.json());
// お気に入りした記事を格納
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield UserFavoritePage_1.default.create({
            user_id: req.body.user_id,
            favorite_page_id: req.body.favorite_page_id,
        });
        res.send("post_favorite ok!!");
    }
    catch (err) {
        console.log(err);
    }
}));
// ユーザーがお気に入り登録しているかチェック
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFavorite = yield UserFavoritePage_1.default.findOne({
            where: {
                user_id: req.query.user_id,
                favorite_page_id: req.query.favorite_page_id,
            },
        });
        res.send(userFavorite);
    }
    catch (err) {
        console.log(err);
    }
}));
// お気に入り解除
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserFavoritePage_1.default.destroy({
            where: {
                user_id: req.body.user_id,
                favorite_page_id: req.body.favorite_page_id,
            },
        });
        res.send("delete favorite data");
    }
    catch (err) {
        console.log(err);
    }
}));
// お気に入りしたページ番号を返す
router.get("/page_number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPageNumber = yield UserFavoritePage_1.default.findAll({
            where: {
                user_id: req.query.userID,
            },
            attributes: [["favorite_page_id", "favoritePageId"]],
        });
        res.send(getPageNumber);
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/page_delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserFavoritePage_1.default.destroy({
            where: {
                favorite_page_id: req.body.favorite_page_id,
            },
        });
        res.send("delete page");
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/favorite_number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserFavoritePage_1.default.findAll({
            where: {
                favorite_page_id: req.query.favorite_page_id,
            },
        });
        res.send(result);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
