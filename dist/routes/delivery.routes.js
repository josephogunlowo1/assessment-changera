"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const delivery_controller_1 = __importDefault(require("../controllers/delivery.controller"));
router.get("/:DPId", delivery_controller_1.default.viewOrders);
router.get("/:DPId/:OrderId", delivery_controller_1.default.viewSpecificOrders);
router.post("/address/:DPId", delivery_controller_1.default.addAddress);
router.post("/order/:orderId", delivery_controller_1.default.orderDelivered);
router.put("/:DPId", delivery_controller_1.default.changeStatus);
exports.default = router;
//# sourceMappingURL=delivery.routes.js.map