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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const Food_1 = require("./Food");
let Image = class Image extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Image.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Image.prototype, "imagePath", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Image.prototype, "foodId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Food_1.Food, (item) => item.images),
    typeorm_1.JoinColumn({ name: "foodId" }),
    __metadata("design:type", Food_1.Food)
], Image.prototype, "food", void 0);
Image = __decorate([
    typeorm_1.Entity()
], Image);
exports.Image = Image;
//# sourceMappingURL=Image.js.map