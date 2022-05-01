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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Ingredient_1 = require("../entities/Ingredient");
const Admin_1 = require("../entities/Admin");
const Food_1 = require("../entities/Food");
const Restaurant_1 = require("../entities/Restaurant");
const typeorm_1 = require("typeorm");
const Address_1 = require("../entities/Address");
const FoodIngredient_1 = require("../entities/FoodIngredient");
const restaurantUtils_1 = require("../ControllerUtils/restaurantUtils");
const FoodIngredientUtils_1 = require("../ControllerUtils/FoodIngredientUtils");
const FoodUtils_1 = require("../ControllerUtils/FoodUtils");
const Order_1 = require("../entities/Order");
const adminUtils_1 = require("../ControllerUtils/adminUtils");
const Delivery_Person_1 = require("../entities/Delivery_Person");
const Coupon_1 = require("../entities/Coupon");
const couponUtils_1 = require("../ControllerUtils/couponUtils");
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({
        iss: "https://github.com/Arkaraj",
        sub: id,
        isAdmin: true,
    }, `${process.env.SECRET}`, { expiresIn: "30d" });
};
exports.default = {
    loginAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        Admin_1.Admin.findOne({ where: { email } }).then((admin) => {
            if (!admin) {
                res
                    .status(400)
                    .json({ message: { msg: "Invalid Admin Email", msgError: true } });
            }
            else {
                const token = signToken(admin.Adminid);
                res.cookie("access_token", token, {
                    httpOnly: true,
                    sameSite: true,
                });
                res.status(200).json({
                    admin,
                    isAdminAuth: true,
                    message: { msgError: false },
                });
            }
        });
    }),
    viewAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield Admin_1.Admin.findOne(req.user.Adminid);
        if (admin) {
            res.status(200).json({ admin });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    addRestaurant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, tag } = req.body;
        const restaurant = yield Restaurant_1.Restaurant.create({
            name,
            tag,
            available: true,
            items: [],
            Orders: [],
        }).save();
        res.status(200).json({ restaurant });
    }),
    addAddressToRestaurant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { city, state, Country, location, pincode, phone, } = req.body;
        const addressRepo = typeorm_1.getRepository(Address_1.Address);
        const newAddress = addressRepo.create({
            city,
            state,
            Country,
            location,
            pincode,
            phone,
        });
        yield addressRepo
            .save(newAddress)
            .catch((err) => {
            res.status(500).json({
                message: { msg: "Error has occured", msgError: true, err },
            });
        })
            .then((address) => __awaiter(void 0, void 0, void 0, function* () {
            const restRepo = typeorm_1.getRepository(Restaurant_1.Restaurant);
            const restaurant = yield restRepo.findOne(req.params.rId);
            if (restaurant && address) {
                restaurant.address = address;
            }
            yield (restaurant === null || restaurant === void 0 ? void 0 : restaurant.save());
            res.status(200).json({ address, restaurant });
        }));
    }),
    addDish: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { restaurantId } = req.params;
        const { name, description, quantity, price, } = req.body;
        try {
            const restaurant = yield Restaurant_1.Restaurant.findOne(restaurantId);
            if (restaurant) {
                const food = yield Food_1.Food.create({
                    name,
                    description,
                    quantity,
                    price,
                    restaurantId,
                    userId: null,
                    orderOid: null,
                }).save();
                let images = [];
                if (req.files) {
                    images = yield adminUtils_1.uploadImagesForFood(req, food);
                }
                food.restaurant = restaurant;
                yield food.save();
                res.status(200).json({ food, restaurant, images });
            }
            else {
                res.status(500).json({ msg: "Internal Server Error" });
            }
        }
        catch (err) {
            res
                .status(200)
                .json({ msg: "Either food is inserted or some error occured" });
        }
    }),
    addIngredient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const ingredient = yield Ingredient_1.Ingredient.create({ name }).save();
        res.status(200).json({ ingredient, msg: "Created Ingredient" });
    }),
    addAddress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { city, state, Country, location, pincode, phone, } = req.body;
        const addressRepo = typeorm_1.getRepository(Address_1.Address);
        const newAddress = addressRepo.create({
            city,
            state,
            Country,
            location,
            pincode,
            phone,
        });
        yield addressRepo
            .save(newAddress)
            .catch((err) => {
            res.status(500).json({
                message: { msg: "Error has occured", msgError: true, err },
            });
        })
            .then((address) => __awaiter(void 0, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(Admin_1.Admin);
            const admin = yield userRepo.findOne(req.user.Adminid);
            if (admin && address) {
                admin.address = address;
            }
            yield (admin === null || admin === void 0 ? void 0 : admin.save());
            res.status(200).json({ address, admin: admin });
        }));
    }),
    addRestaurantAddress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { city, state, Country, location, pincode, phone, } = req.body;
        const resturant = yield Restaurant_1.Restaurant.findOne(req.params.restaurantId);
        if (resturant) {
            const address = yield Address_1.Address.create({
                city,
                state,
                Country,
                location,
                pincode,
                phone,
            }).save();
            resturant.address = address;
            yield resturant.save();
            res.status(200).json({ resturant });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    addIngredientToFood: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { foodId, IngId } = req.params;
        const food = yield Food_1.Food.findOne(foodId);
        const ingredient = yield Ingredient_1.Ingredient.findOne(IngId);
        if (food && ingredient) {
            const food_Ingredient = yield FoodIngredient_1.FoodIngredient.create({
                FoodId: foodId,
                IngredientId: IngId,
                Food: food,
                Ingredient: ingredient,
            }).save();
            res
                .status(200)
                .json({ food, ingredient, food_Ingredient: food_Ingredient });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    removeIngredientToFood: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { foodId, IngId } = req.params;
        const food_Ingredient = yield FoodIngredient_1.FoodIngredient.delete({
            FoodId: foodId,
            IngredientId: IngId,
        });
        res.status(200).json({ food_Ingredient: food_Ingredient });
    }),
    restaurantClosed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Rid = req.params.Rid;
        const { available } = req.body;
        const restaurant = yield restaurantUtils_1.makeRestaurantChange(Rid, available);
        if (restaurant) {
            res.status(200).json({ restaurant });
        }
        else {
            res.status(500).json({ msg: "Invalid Restaurant Id given...." });
        }
    }),
    dishOver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Fid = req.params.Fid;
        const { available } = req.body;
        const food = yield FoodUtils_1.makeItemsChange(Fid, available);
        if (food) {
            res.status(200).json({ food });
        }
        else {
            res.status(500).json({ msg: "Invalid Food Id given...." });
        }
    }),
    getAllRestaurant: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield restaurantUtils_1.getAllRestaurants();
        res.status(200).json({ restaurant });
    }),
    getSpecificRestaurant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield restaurantUtils_1.getSpecificRestaurants(req.params.Rid);
        res.status(200).json({ restaurant });
    }),
    getAllDishes: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foodList = yield Food_1.Food.find();
        res.status(200).json({ dishes: foodList });
    }),
    getAllDishesAndIngredients: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foodList = yield FoodIngredientUtils_1.queryAllFoodsAlongWithIngredients();
        res.status(200).json({ dishes: foodList });
    }),
    getAllIngredients: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ingredient = yield Ingredient_1.Ingredient.find();
        res.status(200).json({ ingredient });
    }),
    DeleteSpecificRestaurant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedRestaurant = yield restaurantUtils_1.deleteRestaurant(req.params.rId);
        res.status(200).json({ deletedRestaurant });
    }),
    DeleteSpecificFood: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Fid = req.params.foodId;
        const deletedFood = yield Food_1.Food.delete({ Fid });
        res.status(200).json({ deletedFood });
    }),
    DeleteSpecificIngredient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Ingid = req.params.ingredientId;
        const deletedIngredient = yield Ingredient_1.Ingredient.delete({ Ingid });
        res.status(200).json({ deletedIngredient });
    }),
    ViewAllOrders: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield Order_1.Order.find();
        res.status(200).json({ order });
    }),
    ViewAssignedOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.user.Adminid;
        const order = yield adminUtils_1.ViewOrderAssigned(adminId);
        res.status(200).json({ order });
    }),
    ControlOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { status } = req.body;
        const orderId = req.params.Oid;
        const order = yield adminUtils_1.ControlOrder(orderId, status);
        if (order) {
            res.status(200).json({ order });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    addDeliveryPerson: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const dperson = yield Delivery_Person_1.Delivery_Person.create({
            name,
            available: true,
        }).save();
        res
            .status(200)
            .json({ Delivery_Person: dperson, msg: "Created New Delivery Person" });
    }),
    ViewDeliveryPerson: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dperson = yield Delivery_Person_1.Delivery_Person.find();
        res.status(200).json({ Delivery_Person: dperson });
    }),
    viewAllCoupons: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const coupon = yield Coupon_1.Coupon.find();
        res.status(200).json({ coupon });
    }),
    addCoupon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, value } = req.body;
        try {
            const coupon = yield Coupon_1.Coupon.create({
                title,
                value,
            }).save();
            res.status(200).json({ coupon });
        }
        catch (err) {
            res.status(500).json({ msg: "Internal Server Error", error: err });
        }
    }),
    changeCoupon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { couponId } = req.params;
        const coupon = yield couponUtils_1.updateCoupon(couponId, req.body);
        res.status(200).json({ coupon });
    }),
    changeRestaurantDiscounts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Rid } = req.params;
        const { discount } = req.body;
        const restaurant = yield restaurantUtils_1.ControlDiscountsInRestaurants(Rid, discount);
        if (restaurant) {
            res.status(200).json({ restaurant });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
};
//# sourceMappingURL=admin.controllers.js.map