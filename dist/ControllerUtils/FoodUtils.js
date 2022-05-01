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
exports.showFoodSearchedFor = exports.makeItemsChange = void 0;
const Food_1 = require("../entities/Food");
const makeItemsChange = (Fid, available) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield Food_1.Food.findOne(Fid);
    food.available = available;
    food.save();
    return food;
});
exports.makeItemsChange = makeItemsChange;
const showFoodSearchedFor = (foodName, city, req) => __awaiter(void 0, void 0, void 0, function* () {
    let min = 0, max = 99999999, rating = 0;
    if (req.query.min) {
        min = parseInt(req.query.min);
    }
    if (req.query.max) {
        max = parseInt(req.query.max);
    }
    if (req.query.rating) {
        rating = parseInt(req.query.rating);
    }
    return yield Food_1.Food.createQueryBuilder("food")
        .leftJoinAndSelect("food.restaurant", "restaurant")
        .leftJoinAndSelect("restaurant.address", "addr")
        .where("food.name like :foodName", { foodName: `%${foodName}%` })
        .andWhere("restaurant.available = :bool", { bool: true })
        .andWhere("food.available = :bool", { bool: true })
        .andWhere("addr.city = :city", { city })
        .andWhere("food.price >= :min and food.price <= :max", { min, max })
        .andWhere("restaurant.totalRating >= :rating", { rating })
        .getMany();
});
exports.showFoodSearchedFor = showFoodSearchedFor;
//# sourceMappingURL=FoodUtils.js.map