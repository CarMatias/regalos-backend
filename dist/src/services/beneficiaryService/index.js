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
class BeneficiaryService {
    newBeneficiary(name, apellido, id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbConnection_1.default.from('beneficiario').insert([{ name: name, apellido: apellido, id_user: id_user }]);
            return data != null ? 'Se agrego correctamente el benficiario!' : error;
        });
    }
    getBeneficiaryById(id_beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: beneficiario, error } = yield dbConnection_1.default
                .from('beneficiario')
                .select('name,apellido')
                .eq('id', id_beneficiary);
            return beneficiario;
        });
    }
    getBeneficiarys(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id_user);
            const { data: beneficiario, error } = yield dbConnection_1.default.from('beneficiario').select('name,apellido,id').eq('id_user', id_user);
            console.log(beneficiario);
            return beneficiario;
        });
    }
}
exports.default = new BeneficiaryService();
//# sourceMappingURL=index.js.map