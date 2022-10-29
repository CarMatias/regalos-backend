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
const index_1 = __importDefault(require("../giftsService/index"));
const createQxT = (question, tag) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield dbConnection_1.default
        .from('preguntaetiqueta')
        .insert([
        { id_etiqueta: tag, id_pregunta: question },
    ]);
});
const tagValue = (idQuestion, tag) => __awaiter(void 0, void 0, void 0, function* () {
    let label = yield index_1.default.findLabel(tag);
    if (label == null) {
        label = yield index_1.default.uploadlabel(tag);
    }
    createQxT(idQuestion, yield label);
});
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // BY COPAILOT
    }
}
const getAllTags = (idQuestion) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = idQuestion.map((value) => value.id);
    let { data: preguntaetiqueta, error } = yield dbConnection_1.default
        .from('pregunta')
        .select(`
            id,
            nombre,
            etiquetas:preguntaetiqueta(etiqueta(name))
        `).in("id", ids);
    const question = preguntaetiqueta.map((p) => ({
        id: p.id,
        name: p.nombre,
        etiquetas: p.etiquetas.map((e) => e.etiqueta.name),
    }));
    shuffleArray(question);
    return question;
});
class UploadQuestionService {
    uploadQuestion(question, image, lstEtiquetas) {
        return __awaiter(this, void 0, void 0, function* () {
            if (question.startsWith("¿ ") && question.endsWith(" ?")) {
                const { data, error } = yield dbConnection_1.default
                    .from('pregunta')
                    .insert([
                    { nombre: question, image: image },
                ]);
                if (data != null) {
                    lstEtiquetas.map((value) => __awaiter(this, void 0, void 0, function* () { return yield tagValue(data[0].id, value); }));
                    return "Se ha cargado correctamente la pregunta!";
                }
                else {
                    error.message;
                }
            }
            else {
                return "La pregunta debe esta en formato: ¿ Pregunta Ejemplo ?";
            }
        });
    }
    getRandomQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            const lstRandomQ = [];
            let { data: pregunta, error } = yield dbConnection_1.default
                .from('pregunta')
                .select("*");
            let randomPreguntas = [];
            while (randomPreguntas.length < 8) {
                let randomNumber = Math.trunc(Math.random() * pregunta.length);
                if (!randomPreguntas.includes(randomNumber)) {
                    randomPreguntas.push(randomNumber);
                }
            }
            for (const randomPregunta of randomPreguntas) {
                console.log(randomPregunta);
                lstRandomQ.push(pregunta[randomPregunta]);
            }
            const lstIdTags = getAllTags(lstRandomQ);
            return lstIdTags;
        });
    }
    newFeedBack(idu, idr, cali) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbConnection_1.default
                .from('feedback')
                .insert([
                { id_usuario: idr, id_regalo: idu, calificacion: cali },
            ]);
            return data;
        });
    }
}
exports.default = new UploadQuestionService;
//# sourceMappingURL=index.js.map