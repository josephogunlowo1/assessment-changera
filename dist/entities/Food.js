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
exports.Food = void 0;
const typeorm_1 = require("typeorm");
const FoodIngredient_1 = require("./FoodIngredient");
const Image_1 = require("./Image");
const Order_1 = require("./Order");
const Restaurant_1 = require("./Restaurant");
const User_1 = require("./User");
let Food = class Food extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Food.prototype, "Fid", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Food.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Food.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("int", { default: 1 }),
    __metadata("design:type", Number)
], Food.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column("float"),
    __metadata("design:type", Number)
], Food.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("boolean", { default: true }),
    __metadata("design:type", Boolean)
], Food.prototype, "available", void 0);
__decorate([
    typeorm_1.OneToMany(() => Image_1.Image, (img) => img.food),
    __metadata("design:type", Array)
], Food.prototype, "images", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Food.prototype, "restaurantId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Restaurant_1.Restaurant, (rest) => rest.items),
    typeorm_1.JoinColumn({ name: "restaurantId" }),
    __metadata("design:type", Restaurant_1.Restaurant)
], Food.prototype, "restaurant", void 0);
__decorate([
    typeorm_1.OneToMany(() => FoodIngredient_1.FoodIngredient, (fi) => fi.IngredientId),
    __metadata("design:type", Array)
], Food.prototype, "IngredientConnection", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Food.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (usr) => usr.cart),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Food.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Food.prototype, "orderOid", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Order_1.Order, (order) => order.Items),
    typeorm_1.JoinColumn({ name: "orderOid" }),
    __metadata("design:type", Order_1.Order)
], Food.prototype, "order", void 0);
Food = __decorate([
    typeorm_1.Entity()
], Food);
exports.Food = Food;
//# sourceMappingURL=Food.js.map