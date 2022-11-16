"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gift_routes_1 = __importDefault(require("./routes/gift.routes"));
const recommendations_routes_1 = __importDefault(require("./routes/recommendations.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const fav_routes_1 = __importDefault(require("./routes/fav.routes"));
const beneficiary_routes_1 = __importDefault(require("./routes/beneficiary.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const vendor_routes_1 = __importDefault(require("./routes/vendor.routes"));
const app = (0, express_1.default)();
app.use(beneficiary_routes_1.default);
app.use(fav_routes_1.default);
app.use(gift_routes_1.default);
app.use(recommendations_routes_1.default);
app.use(question_routes_1.default);
app.use(feedback_routes_1.default);
app.use(vendor_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map