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
const buyGiftService_1 = __importDefault(require("../services/buyGiftService"));
const giftsService_1 = __importDefault(require("../services/giftsService"));
const giftsService_2 = __importDefault(require("../services/giftsService"));
const router = (0, express_1.Router)();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/uploadgift', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, tag, price, id_user } = req.body;
    console.log(id_user);
    if (name != null && image != null && tag != null) {
        const newGift = yield giftsService_1.default.uploadGift(name, image, tag, price, id_user);
        res.send(newGift);
    }
    else {
        res.send('Debe enviar un name, image y tag como parametros');
    }
}));
router.post('/buyGift', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { giftId, userId, beneficiaryId } = req.body;
    if (giftId != null && userId != null) {
        yield buyGiftService_1.default.buyGift(giftId, userId, beneficiaryId);
        res.status(200).send('Gift bought');
    }
    else {
        res.status(400).send('Debe enviar un giftId y userId como parametros');
    }
}));
router.get('/getrandomgift', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lstGift = yield giftsService_2.default.getRandomGift();
    res.send(lstGift);
}));
exports.default = router;
router.get('/getBoughtGiftsTags', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield giftsService_1.default.getBoughtGiftsTags();
    res.send(tags);
}));
//# sourceMappingURL=gift.routes.js.map