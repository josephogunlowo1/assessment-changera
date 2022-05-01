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
const Address_1 = require("../entities/Address");
const typeorm_1 = require("typeorm");
const Delivery_Person_1 = require("../entities/Delivery_Person");
const deliveryUtil_1 = require("../ControllerUtils/deliveryUtil");
exports.default = {
    viewOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield deliveryUtil_1.viewOrders(req.params.DPId);
        res.status(200).json({ order });
    }),
    viewSpecificOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield deliveryUtil_1.viewSpecificOrder(req.params.DPId, req.params.OrderId);
        res.status(200).json({ order });
    }),
    addAddress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { city, state, Country, location, pincode, phone, } = req.body;
        const addressRepo = typeorm_1.getRepository(Address_1.Address);
        const newAddress = addressRepo.create({
            city,
            state,
            Country,
            location,
            pincode,
            phone,
        });
        yield addressRepo
            .save(newAddress)
            .catch((err) => {
            res.status(500).json({
                message: { msg: "Error has occured", msgError: true, err },
            });
        })
            .then((address) => __awaiter(void 0, void 0, void 0, function* () {
            const dperson = yield Delivery_Person_1.Delivery_Person.findOne(req.params.DPId);
            if (dperson && address) {
                dperson.address = address;
            }
            yield (dperson === null || dperson === void 0 ? void 0 : dperson.save());
            res.status(200).json({ address, dperson });
        }));
    }),
    orderDelivered: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield deliveryUtil_1.orderDelivered(req.params.orderId);
        if (order) {
            res.status(200).json({ order });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    changeStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Dperson = yield deliveryUtil_1.changeStatusofDelPerson(req.params.DPId, req.body.available);
        if (Dperson) {
            res.status(200).json({ Dperson });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
};
//# sourceMappingURL=delivery.controller.js.map