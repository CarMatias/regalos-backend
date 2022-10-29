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
const path = require('path');
let relativePath = './app.js';
let absolutePath = path.resolve(relativePath);
function uploadlabel(label) {
    return __awaiter(this, void 0, void 0, function* () {
        label = label.toLowerCase();
        try {
            const { data, error } = yield dbConnection_1.default
                .from('etiqueta')
                .insert([
                { name: label }
            ]);
            return yield data[0].id;
        }
        catch (e) {
            //TODO
        }
    });
}
function uploadGifts(name, image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield dbConnection_1.default
                .from('regalo')
                .insert([
                { name: name, image: image },
            ]);
            if (error)
                throw error;
            return yield data[0].id;
        }
        catch (e) {
            //TODO
        }
    });
}
function uploadGxL(id_gift, id_label) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield dbConnection_1.default
                .from('regaloetiqueta')
                .insert([
                { id_regalo: id_gift, id_etiqueta: id_label },
            ]);
        }
        catch (e) {
            //TODO
        }
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
class UploadGiftService {
    uploadGift(name, image, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_gift = yield uploadGifts(name, image);
            for (let label of labels) {
                let id_label = yield this.findLabel(label);
                if (id_label === null || id_label === undefined) {
                    id_label = yield uploadlabel(label);
                    uploadGxL(id_gift, id_label);
                }
                else {
                    uploadGxL(id_gift, id_label);
                }
            }
            return "Regalo cargado Correctamente!";
        });
    }
    getGiftFav(lstGift) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: regalo, error } = yield dbConnection_1.default
                .from('regalo')
                .select("*")
                .in('id', lstGift);
            return regalo;
        });
    }
    uploadlabel(label) {
        return __awaiter(this, void 0, void 0, function* () {
            label = label.toLowerCase();
            try {
                const { data, error } = yield dbConnection_1.default
                    .from('etiqueta')
                    .insert([
                    { name: label }
                ]);
                return yield data[0].id;
            }
            catch (e) {
                //TODO
            }
        });
    }
    findLabel(label) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: id, error } = yield dbConnection_1.default
                .from('etiqueta')
                .select('id')
                .eq('name', label);
            return id != null && id.length != 0 ? id[0].id : null;
        });
    }
    getRandomGift() {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: regalos, error } = yield dbConnection_1.default
                .from('regalo')
                .select('*');
            shuffleArray(regalos);
            const lstRandom = [];
            for (let i = 0; i < 7; i++) {
                lstRandom.push(regalos[i]);
            }
            return lstRandom;
        });
    }
}
exports.default = new UploadGiftService();
//# sourceMappingURL=index.js.map