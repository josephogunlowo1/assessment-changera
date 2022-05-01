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
exports.queryAllFoodsAlongWithIngredients = exports.queryFoodsIngredients = exports.deleteIngfromFood = exports.deleteFoodfromIng = void 0;
const FoodIngredient_1 = require("../entities/FoodIngredient");
const Food_1 = require("../entities/Food");
const Ingredient_1 = require("../entities/Ingredient");
const deleteFoodfromIng = (FoodId) => __awaiter(void 0, void 0, void 0, function* () {
    yield FoodIngredient_1.FoodIngredient.delete({ FoodId });
    yield Food_1.Food.delete({ Fid: FoodId });
    return true;
});
exports.deleteFoodfromIng = deleteFoodfromIng;
const deleteIngfromFood = (Ingid) => __awaiter(void 0, void 0, void 0, function* () {
    yield FoodIngredient_1.FoodIngredient.delete({ IngredientId: Ingid });
    yield Ingredient_1.Ingredient.delete({ Ingid });
    return true;
});
exports.deleteIngfromFood = deleteIngfromFood;
const queryFoodsIngredients = (FoodId) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield FoodIngredient_1.FoodIngredient.createQueryBuilder("fi")
        .leftJoinAndSelect("fi.Food", "food")
        .leftJoinAndSelect("fi.Ingredient", "ingredient")
        .where("fi.FoodId = :FoodId", { FoodId })
        .getMany();
    return food;
});
exports.queryFoodsIngredients = queryFoodsIngredients;
const queryAllFoodsAlongWithIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield FoodIngredient_1.FoodIngredient.createQueryBuilder("fi")
        .leftJoinAndSelect("fi.Food", "food")
        .leftJoinAndSelect("fi.Ingredient", "ingredient")
        .getMany();
});
exports.queryAllFoodsAlongWithIngredients = queryAllFoodsAlongWithIngredients;
//# sourceMappingURL=FoodIngredientUtils.js.map