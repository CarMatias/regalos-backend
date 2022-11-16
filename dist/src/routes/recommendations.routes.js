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
const express_1 = require("express");
const recommendationsService_1 = __importDefault(require("../services/recommendationsService"));
const recommendationsService_2 = __importDefault(require("../services/recommendationsService"));
const router = (0, express_1.Router)();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/findrecom', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { score, userId, beneficiaryId } = req.body;
    if (!score) {
        res.status(400).send('Debe enviar un score como parametro');
        return;
    }
    const recommendations = yield recommendationsService_2.default.removeAlreadyBoughtGifts(yield recommendationsService_2.default.findGifts(score), userId, beneficiaryId);
    res.send(recommendations);
}));
exports.default = router;
router.post('/mysteriousBox', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, userId, beneficiaryId } = req.body;
    if (!tags) {
        res.status(400).send('Debe enviar tags como parametro');
        return;
    }
    const gift = yield recommendationsService_1.default.getMysteriousGift(userId, tags, beneficiaryId);
    res.send(gift);
}));
//# sourceMappingURL=recommendations.routes.js.map