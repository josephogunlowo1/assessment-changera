"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = exports.OrderType = void 0;
const typeorm_1 = require("typeorm");
const Admin_1 = require("./Admin");
const Delivery_Person_1 = require("./Delivery_Person");
const Food_1 = require("./Food");
const User_1 = require("./User");
var OrderType;
(function (OrderType) {
    OrderType["COD"] = "COD";
    OrderType["NET_BANKING"] = "NET_BANKING";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PLACED"] = "PLACED";
    OrderStatus["PAYED"] = "PAYED";
    OrderStatus["ON_TRANSPORT"] = "ON_TRANSPORT";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Order.prototype, "Oid", void 0);
__decorate([
    typeorm_1.Column("float", { default: 0.0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: OrderType, default: OrderType.COD }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PLACED }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "adminId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "DPId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (usr) => usr.Order),
    typeorm_1.JoinColumn({ name: "uid" }),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Food_1.Food, (food) => food.order),
    __metadata("design:type", Array)
], Order.prototype, "Items", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Admin_1.Admin, (admin) => admin.Order),
    typeorm_1.JoinColumn({ name: "adminId" }),
    __metadata("design:type", Admin_1.Admin)
], Order.prototype, "admin", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Delivery_Person_1.Delivery_Person, (DP) => DP.orderId),
    typeorm_1.JoinColumn({ name: "DPId" }),
    __metadata("design:type", Delivery_Person_1.Delivery_Person)
], Order.prototype, "Delivery_Person", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map