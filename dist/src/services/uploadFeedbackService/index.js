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
const dbConnection_1 = __importDefault(require("../dbConnection"));
class UploadFeedbackService {
    newFeedback(id_reg, id_usu, calif) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbConnection_1.default
                .from('feedback')
                .insert([
                { id_regalo: id_reg, id_usuario: id_usu, calificacion: calif },
            ]);
            return data;
        });
    }
}
exports.default = new UploadFeedbackService;
//# sourceMappingURL=index.js.map