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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("./Restaurant");
const User_1 = require("./User");
let Rating = class Rating extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Rating.prototype, "userId", void 0);
__decorate([
    typeorm_1.PrimaryColumn("uuid"),
    __metadata("design:type", String)
], Rating.prototype, "RestaurantId", void 0);
__decorate([
    typeorm_1.Column("float", { default: 0 }),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Rating.prototype, "review", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (usr) => usr.restaurantRatingConnection, {
        primary: true,
    }),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Rating.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Restaurant_1.Restaurant, (rest) => rest.userRatingConnection, {
        primary: true,
    }),
    typeorm_1.JoinColumn({ name: "RestaurantId" }),
    __metadata("design:type", Restaurant_1.Restaurant)
], Rating.prototype, "Restaurant", void 0);
Rating = __decorate([
    typeorm_1.Entity()
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=Rating.js.map