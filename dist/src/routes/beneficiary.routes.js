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
const cors = require("cors");
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("/newbeneficiary", cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const apellido = req.body.apellido;
    const id_user = req.body.id_user;
    console.log(name, apellido, id_user);
    const newB = yield beneficiaryService_1.default.newBeneficiary(name, apellido, id_user);
    if (newB != null) {
        res.send("Se agrego correctamente!");
    }
}));
router.post("/getbeneficiary", cors(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_user = req.body.id_user;
    console.log(id_user);
    const result = yield beneficiaryService_1.default.getBeneficiarys(id_user);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=beneficiary.routes.js.map