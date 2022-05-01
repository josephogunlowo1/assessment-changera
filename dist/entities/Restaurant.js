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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("./Address");
const Food_1 = require("./Food");
const Order_1 = require("./Order");
const Rating_1 = require("./Rating");
let Restaurant = class Restaurant extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Restaurant.prototype, "Rid", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Restaurant.prototype, "tag", void 0);
__decorate([
    typeorm_1.Column("boolean", { default: true }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "available", void 0);
__decorate([
    typeorm_1.Column("float", { nullable: true }),
    __metadata("design:type", Object)
], Restaurant.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column("float", { default: 0 }),
    __metadata("design:type", Number)
], Restaurant.prototype, "totalRating", void 0);
__decorate([
    typeorm_1.OneToMany(() => Rating_1.Rating, (r) => r.userId),
    __metadata("design:type", Array)
], Restaurant.prototype, "userRatingConnection", void 0);
__decorate([
    typeorm_1.OneToMany(() => Food_1.Food, (food) => food.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "items", void 0);
__decorate([
    typeorm_1.OneToMany(() => Order_1.Order, (ord) => ord.Oid),
    __metadata("design:type", Array)
], Restaurant.prototype, "Orders", void 0);
__decorate([
    typeorm_1.OneToOne(() => Address_1.Address, (addr) => addr.Addressid),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Address_1.Address)
], Restaurant.prototype, "address", void 0);
Restaurant = __decorate([
    typeorm_1.Entity()
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=Restaurant.js.map