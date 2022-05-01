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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let connection = null;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield typeorm_1.createConnection()
        .then((connect) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Connected to DB sucessfully ${connect.name}`);
        return connect;
    }))
        .catch((err) => {
        console.log(`Error Occured in connecting to the DB ${err}`);
        return null;
    });
    return connection;
});
main();
exports.default = connection;
//# sourceMappingURL=connection.js.map