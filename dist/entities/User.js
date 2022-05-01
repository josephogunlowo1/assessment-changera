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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("./Address");
const Food_1 = require("./Food");
const Order_1 = require("./Order");
const Rating_1 = require("./Rating");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column("varchar", { unique: true, length: 150 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: 0.0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    typeorm_1.OneToMany(() => Food_1.Food, (f) => f.user),
    __metadata("design:type", Array)
], User.prototype, "cart", void 0);
__decorate([
    typeorm_1.OneToMany(() => Order_1.Order, (ord) => ord.Oid),
    __metadata("design:type", Array)
], User.prototype, "Order", void 0);
__decorate([
    typeorm_1.OneToOne(() => Address_1.Address, (addr) => addr.Addressid),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Address_1.Address)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => Rating_1.Rating, (r) => r.RestaurantId),
    __metadata("design:type", Array)
], User.prototype, "restaurantRatingConnection", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map