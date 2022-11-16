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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const vendorService_1 = __importDefault(require("../services/vendorService"));
const router = (0, express_1.Router)();
const cors = require('cors');
const corsOptions = {
    origin: "*",
    optionsSuccesStatus: 200
};
router.use(body_parser_1.default.json());
router.post('/uploadvendor', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_regalo = req.body.id_regalo;
    const id_usuario = req.body.id_usuario;
    const newVendor = vendorService_1.default.newVendor(id_regalo, id_usuario);
    if (newVendor != null) {
        res.send("Enviado correctamente");
    }
}));
router.get('/getvendor', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_usuario = req.body.id_usuario;
    const result = yield vendorService_1.default.getFeedbackIdByIdUser(id_usuario);
    console.log(result);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=vendor.routes.js.map