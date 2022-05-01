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
exports.ControlDiscountsInRestaurants = exports.deleteRestaurant = exports.makeRestaurantChange = exports.getSpecificRestaurants = exports.getAllRestaurants = exports.getRestaurantsByCities = exports.getSpecificRestaurant = exports.getRestaurantFoodItemsByCities = void 0;
const Food_1 = require("../entities/Food");
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("../entities/Restaurant");
const getRestaurantFoodItemsByCities = (city, req) => __awaiter(void 0, void 0, void 0, function* () {
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
    const restaurantAndFood = yield typeorm_1.getRepository(Restaurant_1.Restaurant)
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.address", "address")
        .leftJoinAndSelect("restaurant.items", "items")
        .where("restaurant.available = :available", { available: true })
        .andWhere("restaurant.totalRating >= :rating", { rating })
        .andWhere("address.city = :city", { city })
        .andWhere("items.available = :available", { available: true })
        .andWhere("items.price >= :min and items.price <= :max", { min, max })
        .getMany();
    return restaurantAndFood;
});
exports.getRestaurantFoodItemsByCities = getRestaurantFoodItemsByCities;
const getSpecificRestaurant = (Rid) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantAndFood = yield typeorm_1.getRepository(Restaurant_1.Restaurant)
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.address", "address")
        .leftJoinAndSelect("restaurant.items", "items")
        .where("restaurant.available = :available", { available: true })
        .andWhere("restaurant.Rid = :Rid", { Rid })
        .getOne();
    return restaurantAndFood;
});
exports.getSpecificRestaurant = getSpecificRestaurant;
const getRestaurantsByCities = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield typeorm_1.getRepository(Restaurant_1.Restaurant)
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.address", "address")
        .andWhere("address.city = :city", { city })
        .getMany();
    return restaurant;
});
exports.getRestaurantsByCities = getRestaurantsByCities;
const getAllRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getRepository(Restaurant_1.Restaurant)
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.address", "address")
        .getMany();
});
exports.getAllRestaurants = getAllRestaurants;
const getSpecificRestaurants = (Rid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getRepository(Restaurant_1.Restaurant)
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.address", "address")
        .leftJoinAndSelect("restaurant.items", "foods")
        .where("restaurant.Rid = :Rid", { Rid })
        .getMany();
});
exports.getSpecificRestaurants = getSpecificRestaurants;
const makeRestaurantChange = (Rid, available) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findOne(Rid);
    restaurant.available = available;
    restaurant.save();
    return restaurant;
});
exports.makeRestaurantChange = makeRestaurantChange;
const deleteRestaurant = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getRepository(Food_1.Food)
        .createQueryBuilder("food")
        .delete()
        .from(Food_1.Food)
        .where("food.restaurantId = :restaurantId", { restaurantId })
        .execute();
    const deletedRestaurant = yield Restaurant_1.Restaurant.delete({ Rid: restaurantId });
    return deletedRestaurant;
});
exports.deleteRestaurant = deleteRestaurant;
const ControlDiscountsInRestaurants = (restaurantId, discount) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findOne(restaurantId);
    if (restaurant) {
        restaurant.discount = discount;
        yield restaurant.save();
        return restaurant;
    }
    else {
        return undefined;
    }
});
exports.ControlDiscountsInRestaurants = ControlDiscountsInRestaurants;
//# sourceMappingURL=restaurantUtils.js.map