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
const beneficiaryService_1 = __importDefault(require("../services/beneficiaryService"));
const router = (0, express_1.Router)();
const cors = require('cors');
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
router.use(body_parser_1.default.json());
router.post('/newbeneficiary', cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.nombre;
    const secondName = req.body.apellido;
    if (name != undefined && secondName != undefined) {
        const newBeneficary = yield beneficiaryService_1.default.newBeneficiary(name, secondName);
        res.send(newBeneficary);
    }
    else {
        res.send("Debe enviar un nombre y apellido como parametro");
    }
}));
exports.default = router;
//# sourceMappingURL=beneficiary.routes.js.map