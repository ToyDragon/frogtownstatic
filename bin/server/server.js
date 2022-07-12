"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
var app = express_1.default();
app.use(express_1.default.static(path.resolve(__dirname, '../views')));
app.use(express_1.default.static(path.resolve(__dirname, '../bundles')));
app.use(express_1.default.static(path.resolve(__dirname, '../../src/views')));
app.listen(8080);
console.log("Listening on port {8080}.");
//# sourceMappingURL=server.js.map