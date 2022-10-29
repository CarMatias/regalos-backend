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
    const { score } = req.body;
    if (!score) {
        res.status(400).send('Debe enviar un score como parametro');
        return;
    }
    const recommendations = yield recommendationsService_1.default.removeAlreadyBoughtGifts(yield recommendationsService_1.default.findGifts(score), 1);
    res.send(recommendations);
}));
exports.default = router;
//# sourceMappingURL=recommendations.routes.js.map