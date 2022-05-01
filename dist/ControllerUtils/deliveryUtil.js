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
exports.changeStatusofDelPerson = exports.orderDelivered = exports.viewSpecificOrder = exports.viewOrders = void 0;
const Delivery_Person_1 = require("../entities/Delivery_Person");
const Order_1 = require("../entities/Order");
const viewOrders = (DPId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.Order.createQueryBuilder("order")
        .leftJoinAndSelect("order.Items", "food")
        .leftJoinAndSelect("order.user", "user")
        .leftJoinAndSelect("user.address", "adr")
        .where("order.DPId = :DPId", { DPId })
        .orderBy("order.Oid", "DESC")
        .getMany();
});
exports.viewOrders = viewOrders;
const viewSpecificOrder = (DPId, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.Order.createQueryBuilder("order")
        .leftJoinAndSelect("order.Items", "food")
        .leftJoinAndSelect("order.user", "user")
        .leftJoinAndSelect("user.address", "adr")
        .where("order.DPId = :DPId", { DPId })
        .andWhere("order.Oid = :orderId", { orderId })
        .orderBy("order.Oid", "DESC")
        .getMany();
});
exports.viewSpecificOrder = viewSpecificOrder;
const orderDelivered = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne(orderId);
    console.log(orderId);
    console.log(order);
    if (order) {
        order.status = Order_1.OrderStatus.DELIVERED;
        yield order.save();
        return order;
    }
    else {
        return undefined;
    }
});
exports.orderDelivered = orderDelivered;
const changeStatusofDelPerson = (DPId, available) => __awaiter(void 0, void 0, void 0, function* () {
    const Dperson = yield Delivery_Person_1.Delivery_Person.findOne(DPId);
    if (Dperson) {
        Dperson.available = available;
        yield Dperson.save();
        return Dperson;
    }
    else {
        return undefined;
    }
});
exports.changeStatusofDelPerson = changeStatusofDelPerson;
//# sourceMappingURL=deliveryUtil.js.map