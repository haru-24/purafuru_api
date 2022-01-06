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
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.use(express_1.default.json());
// ハッシュ化を行うミドルウェア
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashPassword = bcryptjs_1.default.hashSync(req.body.password, saltRounds);
        yield Users_1.default.create({
            user_name: req.body.user_name,
            birth_place: req.body.birth_place,
            email: req.body.email,
            password: hashPassword,
        });
        res.send("users post ok!");
    }
    catch (err) {
        console.log(err);
    }
}));
// ログインの処理
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserData = yield Users_1.default.findOne({
            where: {
                email: [req.body.email],
            },
        });
        if (bcryptjs_1.default.compareSync(req.body.password, getUserData.password)) {
            const payload = {
                id: getUserData.id,
                user_name: getUserData.user_name,
                email: getUserData.email,
                birth_place: getUserData.birth_place,
            };
            const token = jsonwebtoken_1.default.sign(payload, "secret");
            res.json(token);
        }
        else {
            res.send("パスワードが違います");
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/login", (req, res) => {
    const bearToken = req.headers["authorization"];
    const bearer = bearToken.split(" ");
    const token = bearer[1];
    jsonwebtoken_1.default.verify(token, "secret", (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        else {
            return res.json(user);
        }
    });
});
exports.default = router;
