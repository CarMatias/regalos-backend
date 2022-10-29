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
class UploadFavoriteService {
    newFavorite(id_regalo, id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbConnection_1.default
                .from('favorito')
                .insert([
                { id_regalo: id_regalo, id_usuario: id_usuario },
            ]);
        });
    }
    getGiftIdByIdUser(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: favorito, error } = yield dbConnection_1.default
                .from('favorito')
                .select("id_regalo")
                .eq("id_usuario", id_usuario);
            return favorito;
        });
    }
}
exports.default = new UploadFavoriteService;
//# sourceMappingURL=index.js.map