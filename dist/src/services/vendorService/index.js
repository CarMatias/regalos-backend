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
const countFeedback = (feedback) => {
    const goodfeedback = feedback.filter(value => value.calificacion == 's');
    const badfeedback = feedback.filter(value => value.calificacion == 'n');
    return { positive: goodfeedback.length, negative: badfeedback.length };
};
class VendorService {
    newVendor(id_reg, id_usu) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbConnection_1.default
                .from('vendedor')
                .insert([
                { id_regalo: id_reg, id_usuario: id_usu },
            ]);
            return data;
        });
    }
    getGiftsIdByIdUser(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: regalos, error } = yield dbConnection_1.default
                .from("regalo")
                .select("name")
                .eq("id_vendedor", id_usuario);
            return regalos;
        });
    }
    getFeedbackIdByIdUser(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: result, error } = yield dbConnection_1.default
                .from("regalo")
                .select(`
          id,name,feedback(calificacion))
          `).not("id_vendedor", "is", "null");
            let getWithFeedback = yield result.map(value => ({ id: value.id, name: value.name, feedback: countFeedback(value.feedback) }));
            return getWithFeedback;
        });
    }
}
exports.default = new VendorService;
//# sourceMappingURL=index.js.map