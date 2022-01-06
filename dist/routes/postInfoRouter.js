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
const PostInfos_1 = __importDefault(require("../models/PostInfos"));
const moment_1 = __importDefault(require("moment"));
const router = express_1.default.Router();
router.use(express_1.default.json());
// 作成された順に並び替えて送る
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page_number;
    const pageNumber = Number(page);
    const perPage = 10;
    const get = yield PostInfos_1.default.findAndCountAll({
        offset: (pageNumber - 1) * perPage,
        limit: perPage,
        order: [["createdAt", "DESC"]],
    });
    res.json(get);
}));
// 作成された順に並び替えて送る
router.get("/sort_favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page_number;
    const pageNumber = Number(page);
    const perPage = 10;
    const get = yield PostInfos_1.default.findAndCountAll({
        offset: (pageNumber - 1) * perPage,
        limit: perPage,
        order: [["favorites", "DESC"]],
    });
    res.json(get);
}));
// post_infoへ投稿
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line no-unused-vars
        yield PostInfos_1.default.create({
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
            posted_at: (0, moment_1.default)().format("YYYY/ MM/ D"),
        });
        res.send("post_info send ok!");
    }
    catch (err) {
        console.log(err);
    }
}));
// 検索機能
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page_number;
        const pageNumber = Number(page);
        const perPage = 10;
        const pageData = yield PostInfos_1.default.findAndCountAll({
            where: {
                prefecture: req.query.prefecture,
                genre: req.query.genre,
            },
            offset: (pageNumber - 1) * perPage,
            limit: perPage,
            order: [["createdAt", "DESC"]],
        });
        res.json(pageData);
    }
    catch (err) {
        console.log(err);
    }
}));
// 検索機能(お気に入り順にソート)
router.get("/search/sort_favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page_number;
        const pageNumber = Number(page);
        const perPage = 10;
        const pageData = yield PostInfos_1.default.findAndCountAll({
            where: {
                prefecture: req.query.prefecture,
                genre: req.query.genre,
            },
            offset: (pageNumber - 1) * perPage,
            limit: perPage,
            order: [["favorites", "DESC"]],
        });
        res.json(pageData);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/information/:pageID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageData = yield PostInfos_1.default.findOne({
            where: {
                id: [req.params.pageID],
            },
        });
        res.json(pageData);
    }
    catch (err) {
        console.log(err);
    }
}));
// マイページ用情報
router.get("/userPostInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageData = yield PostInfos_1.default.findAll({
            where: {
                user_id: req.query.userID,
            },
            order: [["createdAt", "DESC"]],
        });
        res.json(pageData);
    }
    catch (err) {
        console.log(err);
    }
}));
// お気に入り数追加
router.put("/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PostInfos_1.default.update({
            favorites: req.body.favorites,
        }, {
            where: { id: req.body.id },
        });
    }
    catch (err) {
        console.log(err);
    }
}));
// 自分が投稿した記事の編集
router.put("/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PostInfos_1.default.update({
            genre: req.body.genre,
            place_name: req.body.place_name,
            prefecture: req.body.prefecture,
            post_number: req.body.post_number,
            address: req.body.address,
            apeal_point: req.body.apeal_point,
            recommendation: req.body.recommendation,
            image: req.body.image,
        }, { where: { id: req.body.id } });
        res.send("ok information update");
    }
    catch (err) {
        console.log(err);
    }
}));
// 記事の削除
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PostInfos_1.default.destroy({
            where: {
                id: req.body.id,
            },
        });
        res.send("Information deleted");
    }
    catch (err) {
        console.log(err);
    }
}));
// ユーザーがお気に入りしたページを返す
router.get("/favorite_page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield PostInfos_1.default.findAll({
            where: { id: req.query.pageId },
            order: [["createdAt", "DESC"]],
        });
        res.send(result);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
