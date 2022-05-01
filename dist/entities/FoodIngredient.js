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
exports.FoodIngredient = void 0;
const typeorm_1 = require("typeorm");
const Food_1 = require("./Food");
const Ingredient_1 = require("./Ingredient");
let FoodIngredient = class FoodIngredient extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], FoodIngredient.prototype, "FoodId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], FoodIngredient.prototype, "IngredientId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Food_1.Food, (food) => food.IngredientConnection, { primary: true }),
    typeorm_1.JoinColumn({ name: "FoodId" }),
    __metadata("design:type", Food_1.Food)
], FoodIngredient.prototype, "Food", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Ingredient_1.Ingredient, (ing) => ing.FoodConnection, { primary: true }),
    typeorm_1.JoinColumn({ name: "IngredientId" }),
    __metadata("design:type", Ingredient_1.Ingredient)
], FoodIngredient.prototype, "Ingredient", void 0);
FoodIngredient = __decorate([
    typeorm_1.Entity()
], FoodIngredient);
exports.FoodIngredient = FoodIngredient;
//# sourceMappingURL=FoodIngredient.js.map