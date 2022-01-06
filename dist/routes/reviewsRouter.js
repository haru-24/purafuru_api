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
const router = express_1.default.Router();
const Review_1 = __importDefault(require("../models/Review"));
const moment_1 = __importDefault(require("moment"));
router.use(express_1.default.json());
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Review_1.default.create({
            reviewed_at: (0, moment_1.default)().format("YYYY/ MM/ D h:mm a"),
            review: req.body.review,
            post_information_id: req.body.post_information_id,
            user: req.body.user,
            user_id: req.body.user_id,
            user_birth_place: req.body.user_birth_place,
        });
        res.send(post);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/:pageID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = yield Review_1.default.findAll({
            where: {
                post_information_id: [req.params.pageID],
            },
            order: [["createdAt", "DESC"]],
        });
        res.json(reviewData);
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Review_1.default.destroy({
            where: {
                id: req.body.id,
            },
        }).then(() => {
            res.send("delete comment");
        });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
