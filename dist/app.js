"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("./logger/morgan"));
require("dotenv-save").config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({ origin: "*" }));
require("reflect-metadata");
require("./config/connection");
app.use(cookie_parser_1.default());
app.use(morgan_1.default);
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const delivery_routes_1 = __importDefault(require("./routes/delivery.routes"));
app.use("/api/users", user_routes_1.default);
app.use("/api/admins", admin_routes_1.default);
app.use("/api/delivery", delivery_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Lamorak Backend for Food Delivery app");
});
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port} 🚀`);
});
//# sourceMappingURL=app.js.map