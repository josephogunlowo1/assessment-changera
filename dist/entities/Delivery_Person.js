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
exports.Delivery_Person = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("./Address");
const Order_1 = require("./Order");
let Delivery_Person = class Delivery_Person extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Delivery_Person.prototype, "DPid", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Delivery_Person.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("boolean", { default: true }),
    __metadata("design:type", Boolean)
], Delivery_Person.prototype, "available", void 0);
__decorate([
    typeorm_1.OneToOne(() => Address_1.Address, (addr) => addr.Addressid),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Address_1.Address)
], Delivery_Person.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => Order_1.Order, (ord) => ord.Delivery_Person),
    __metadata("design:type", Array)
], Delivery_Person.prototype, "orderId", void 0);
Delivery_Person = __decorate([
    typeorm_1.Entity()
], Delivery_Person);
exports.Delivery_Person = Delivery_Person;
//# sourceMappingURL=Delivery_Person.js.map