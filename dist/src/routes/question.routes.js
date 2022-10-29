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
const questionService_1 = __importDefault(require("../services/questionService"));
const router = (0, express_1.Router)();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 201 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/uploadquestion', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = req.body.question;
    const image = req.body.image;
    const lstEtiquetas = req.body.tags;
    if (question != null && image != null) {
        const newQuestion = yield questionService_1.default.uploadQuestion(question, image, lstEtiquetas);
        res.send(newQuestion);
    }
    else {
        res.send("Debe enviar una question e image como parametros");
    }
}));
router.get('/getrandomquestion', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lstResults = yield questionService_1.default.getRandomQuestion();
    res.send(lstResults);
}));
exports.default = router;
//# sourceMappingURL=question.routes.js.map