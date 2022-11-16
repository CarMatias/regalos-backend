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
const buyGiftService_1 = __importDefault(require("../buyGiftService"));
const dbConnection_1 = __importDefault(require("../dbConnection"));
const getIdByTag = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data: etiqueta, error } = yield dbConnection_1.default.from('etiqueta').select('*').in('name', tags);
        return etiqueta;
    }
    catch (e) {
        //TODO
    }
});
const getIdGift = (idTag) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data: regaloetiqueta, error } = yield dbConnection_1.default
            .from('regaloetiqueta')
            .select('*')
            .in('id_etiqueta', idTag);
        return regaloetiqueta;
    }
    catch (e) {
        //TODO
    }
});
const getGifts = (idGifts) => __awaiter(void 0, void 0, void 0, function* () {
    let { data: regalo, error } = yield dbConnection_1.default
        .from('regalo')
        .select('*')
        .in('id', idGifts);
    return regalo;
});
const findTagsValues = (tags, value) => {
    let tag = tags.find((v) => v.id == value.id_etiqueta);
    return tag;
};
class RecommendationsService {
    removeAlreadyBoughtGifts(gifts, userId, beneficiaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield dbConnection_1.default
                .from('regalobeneficiario')
                .select('*')
                .eq('id_beneficiario', beneficiaryId)
                .eq('id_usuario', userId);
            const boughtGiftIds = data !== null && data !== void 0 ? data : [];
            console.log(boughtGiftIds);
            const boughtGifts = boughtGiftIds.map((gift) => gift.id_regalo);
            return gifts.filter((gift) => !boughtGifts.includes(gift.id));
        });
    }
    getMysteriousGift(userId, tags, beneficiaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const regalos = yield dbConnection_1.default
                .from('regalo')
                .select(`
          id,
          name,
          image,
          beneficiarios:regalobeneficiario(
            id_beneficiario,
            id_usuario
          ),
          etiquetas:regaloetiqueta!inner(
            etiqueta!inner(name)
          )
    `)
                .in('etiquetas.etiqueta.name', tags);
            const mappedData = regalos.data.filter((r) => r.beneficiarios.length == 0);
            const index = Math.floor(Math.random() * mappedData.length);
            buyGiftService_1.default.buyGift(regalos.data[index].id, userId.toString(), beneficiaryId);
            return mappedData.map((e) => ({
                id: e.id,
                name: e.name,
                imgSource: e.image,
            }))[index];
        });
    }
    findGifts(scores) {
        return __awaiter(this, void 0, void 0, function* () {
            const regalos = [];
            let regaloDTO;
            let arrTag = scores.map((v) => v.nombre);
            let lstIdTags = yield getIdByTag(arrTag);
            let arr = lstIdTags.map((value) => value.id);
            let lstIdGift = yield getIdGift(arr);
            let arrGift = lstIdGift.map((value) => value.id_regalo);
            for (let gift of yield getGifts(arrGift)) {
                let tagTemp = lstIdGift
                    .filter((value) => value.id_regalo == gift.id)
                    .map((value) => findTagsValues(lstIdTags, value));
                if (tagTemp != null || tagTemp != undefined) {
                    let objTemp = { id: gift.id, name: gift.name, image: gift.image };
                    let lstTag = [];
                    tagTemp.map((value) => lstTag.push({ id: value.id, name: value.name }));
                    let regaloDTO = Object.assign(Object.assign({}, objTemp), { etiqueta: lstTag });
                    regalos.push(regaloDTO);
                }
            }
            const result = regalos.map((regalo) => {
                let matches = [];
                regalo.etiqueta.map((etiqueta) => matches.push(scores.filter((sc) => sc.nombre == etiqueta.name)));
                let puntaje = 0;
                matches.map((match) => (puntaje += match[0].puntaje));
                return { id: regalo.id, nombre: regalo.name, puntaje: puntaje, image: regalo.image };
            });
            return result;
        });
    }
}
exports.default = new RecommendationsService();
//# sourceMappingURL=index.js.map