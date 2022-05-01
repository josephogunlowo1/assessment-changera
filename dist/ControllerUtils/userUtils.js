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
exports.RateRestaurant = exports.CancelOrder = exports.OrderItems = exports.ViewSpecificOrder = exports.ViewOrderedItems = exports.removeFromCart = exports.addToCart = exports.getUserCartItems = exports.getUserWithAddress = void 0;
const Food_1 = require("../entities/Food");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Order_1 = require("../entities/Order");
const Delivery_Person_1 = require("../entities/Delivery_Person");
const Admin_1 = require("../entities/Admin");
const Restaurant_1 = require("../entities/Restaurant");
const Rating_1 = require("../entities/Rating");
const getUserWithAddress = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder("User")
        .leftJoinAndSelect("User.address", "address")
        .where("User.uid = :id", { id: req.user.uid })
        .getOne();
    return user;
});
exports.getUserWithAddress = getUserWithAddress;
const getUserCartItems = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder("User")
        .leftJoinAndSelect("User.cart", "cart")
        .where("User.uid = :id", { id: req.user.uid })
        .getOne();
    return user;
});
exports.getUserCartItems = getUserCartItems;
const addToCart = (userId, foodId) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield Food_1.Food.findOne(foodId);
    const user = yield User_1.User.findOne(userId);
    if (food && user) {
        food.userId = userId;
        food.user = user;
        food.quantity = food.quantity - 1;
        food.available = food.quantity === 0 ? false : true;
        const restaurant = yield Restaurant_1.Restaurant.findOne(food.restaurantId);
        if (restaurant.discount) {
            food.price *= 1 - restaurant.discount / 100;
        }
        yield food.save();
        return food;
    }
    else {
        return null;
    }
});
exports.addToCart = addToCart;
const removeFromCart = (foodId) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield Food_1.Food.findOne(foodId);
    food.userId = null;
    food.quantity = food.quantity + 1;
    food.available = true;
    yield food.save();
    return food;
});
exports.removeFromCart = removeFromCart;
const ViewOrderedItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.Order.find({
        where: { uid: userId },
        order: { Oid: "DESC" },
    });
});
exports.ViewOrderedItems = ViewOrderedItems;
const ViewSpecificOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getRepository(Order_1.Order)
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.Items", "items")
        .leftJoinAndSelect("items.restaurant", "restaurant")
        .leftJoinAndSelect("order.Delivery_Person", "DP")
        .where("order.Oid = :orderId", { orderId })
        .getOne();
});
exports.ViewSpecificOrder = ViewSpecificOrder;
const OrderItems = (userId, method, couponValue) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_1.User)
        .createQueryBuilder("User")
        .leftJoinAndSelect("User.cart", "cart")
        .leftJoinAndSelect("User.address", "address")
        .where("User.uid = :id", { id: userId })
        .getOne();
    const cartPriceArray = user === null || user === void 0 ? void 0 : user.cart.map((item) => item.price);
    let totalPrice = cartPriceArray === null || cartPriceArray === void 0 ? void 0 : cartPriceArray.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
    if (couponValue) {
        totalPrice *= 1 - couponValue / 100;
    }
    const newOrder = Order_1.Order.create({
        uid: userId,
        Items: user === null || user === void 0 ? void 0 : user.cart,
        totalPrice,
        type: method,
        status: Order_1.OrderStatus.PLACED,
    });
    const deliveryPerson = yield typeorm_1.getRepository(Delivery_Person_1.Delivery_Person)
        .createQueryBuilder("DP")
        .leftJoinAndSelect("DP.address", "addr")
        .leftJoinAndSelect("DP.orderId", "order")
        .where("addr.city = :city", { city: user === null || user === void 0 ? void 0 : user.address.city })
        .andWhere("DP.available = :bool", { bool: true })
        .andWhere("order.status != :orderStatus", { orderStatus: "DELIVERED" })
        .getMany();
    const adminPerson = yield typeorm_1.getRepository(Admin_1.Admin)
        .createQueryBuilder("admin")
        .leftJoinAndSelect("admin.address", "adr")
        .where("adr.city = :city", { city: user === null || user === void 0 ? void 0 : user.address.city })
        .getMany();
    const numOfOrders = deliveryPerson
        .map((DP, indx) => {
        return { value: DP.orderId.length, indx };
    })
        .sort((a, b) => {
        return a.value - b.value;
    });
    const indx = numOfOrders[0].indx;
    newOrder.DPId = deliveryPerson[indx].DPid;
    newOrder.Delivery_Person = deliveryPerson[indx];
    var admin = adminPerson[Math.floor(Math.random() * adminPerson.length)];
    newOrder.adminId = admin.Adminid;
    newOrder.admin = admin;
    user.cart = [];
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield newOrder.save();
    return newOrder;
});
exports.OrderItems = OrderItems;
const CancelOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne(orderId);
    if ((order === null || order === void 0 ? void 0 : order.status) != Order_1.OrderStatus.DELIVERED) {
        order.status = Order_1.OrderStatus.CANCELLED;
    }
    else {
        return undefined;
    }
    yield order.save();
    return order;
});
exports.CancelOrder = CancelOrder;
const RateRestaurant = (userId, restaurantId, rating, review) => __awaiter(void 0, void 0, void 0, function* () {
    const ratingList = yield Rating_1.Rating.findOne({
        where: { RestaurantId: restaurantId, userId },
    });
    if (ratingList) {
        ratingList.rating = rating;
        ratingList.review = null;
        if (review) {
            ratingList.review = review;
        }
        yield ratingList.save();
    }
    else {
        const user = yield User_1.User.findOne(userId);
        const restaurant = yield Restaurant_1.Restaurant.findOne(restaurantId);
        if (user && restaurant) {
            yield Rating_1.Rating.create({
                userId,
                RestaurantId: restaurantId,
                rating,
                user,
                Restaurant: restaurant,
                review: review ? review : null,
            }).save();
        }
        else {
            return undefined;
        }
    }
    const allRating = yield Rating_1.Rating.find({
        where: { RestaurantId: restaurantId },
    });
    const hotel = yield Restaurant_1.Restaurant.findOne(restaurantId);
    const totalRating = allRating
        .map((item) => item.rating)
        .reduce((prev, curr) => {
        return prev + curr;
    }, 0);
    hotel.totalRating = totalRating / allRating.length;
    yield (hotel === null || hotel === void 0 ? void 0 : hotel.save());
    return {
        avgRating: totalRating / allRating.length,
        outOf: allRating.length,
        hotel,
    };
});
exports.RateRestaurant = RateRestaurant;
//# sourceMappingURL=userUtils.js.map