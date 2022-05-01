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
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../entities/User");
const Address_1 = require("../entities/Address");
const userUtils_1 = require("../ControllerUtils/userUtils");
const restaurantUtils_1 = require("../ControllerUtils/restaurantUtils");
const FoodIngredientUtils_1 = require("../ControllerUtils/FoodIngredientUtils");
const FoodUtils_1 = require("../ControllerUtils/FoodUtils");
const Coupon_1 = require("../entities/Coupon");
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({
        iss: "https://github.com/Arkaraj",
        sub: id,
        isAdmin: false,
    }, `${process.env.SECRET}`, { expiresIn: "30d" });
};
exports.default = {
    getAllUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.find();
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    getSpecificUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ where: { uid: req.params.id } });
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userName, email, password, } = req.body;
        try {
            User_1.User.find({ where: { email } }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
                if (user.length > 0) {
                    res.status(400).json({
                        message: { msg: "Email is already taken", msgError: true },
                    });
                }
                else {
                    const userRepo = typeorm_1.getRepository(User_1.User);
                    const hash = yield bcrypt_1.default.hash(password, 10);
                    const newUser = userRepo.create({ userName, email, password: hash });
                    yield userRepo.save(newUser).catch((err) => {
                        res.status(500).json({
                            message: { msg: "Error has occured", msgError: true, err },
                        });
                    });
                    res.status(200).json(user);
                }
            }));
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userRepo = typeorm_1.getRepository(User_1.User);
        userRepo.findOne({ where: { email } }).then((user) => {
            if (!user) {
                res
                    .status(400)
                    .json({ message: { msg: "Invalid Email", msgError: true } });
            }
            else {
                bcrypt_1.default.compare(password, user.password, (err, validate) => {
                    if (err) {
                        res.status(500).json({
                            message: { msg: "Error has occured in bcrypt", msgError: true },
                        });
                    }
                    if (!validate) {
                        res
                            .status(400)
                            .json({ message: { msg: "Invalid Password", msgError: true } });
                    }
                    else {
                        const token = signToken(user.uid);
                        res.cookie("access_token", token, {
                            httpOnly: true,
                            sameSite: true,
                        });
                        res.status(200).json({
                            user,
                            isAuthenticated: true,
                            message: { msgError: false },
                        });
                    }
                });
            }
        });
    }),
    logoutUser: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("access_token");
        res.status(200).json({ msg: "Logged out", user: {}, success: true });
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
            const userRepo = typeorm_1.getRepository(User_1.User);
            const user = yield userRepo.findOne(req.user.uid);
            if (user && address) {
                user.address = address;
            }
            yield (user === null || user === void 0 ? void 0 : user.save());
            res.status(200).json({ address, user });
        }));
    }),
    showUserMenu: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userUtils_1.getUserWithAddress(req);
            const city = user === null || user === void 0 ? void 0 : user.address.city;
            if (city) {
                const restaurantAndFood = yield restaurantUtils_1.getRestaurantFoodItemsByCities(city, req);
                res.status(200).json({ restaurantAndFood });
            }
            else {
                res.status(200).json({ msg: "Please Register your Address" });
            }
        }
        catch (err) {
            res.status(200).json({ msg: "Please Register your Address" });
        }
    }),
    showUserRequestedDish: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { foodName } = req.body;
        const user = yield userUtils_1.getUserWithAddress(req);
        const city = user === null || user === void 0 ? void 0 : user.address.city;
        if (city) {
            const restaurantAndFood = yield FoodUtils_1.showFoodSearchedFor(foodName, city, req);
            res.status(200).json({ restaurantAndFood });
        }
        else {
            res.status(200).json({ msg: "Please Register your Address" });
        }
    }),
    showUserSpecificResturant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const resturantId = req.params.resturantId;
        const resturant = yield restaurantUtils_1.getSpecificRestaurant(resturantId);
        res.status(200).json({ resturant });
    }),
    showUserSpecificFoodItem: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const FoodId = req.params.FoodId;
        const foodItem = yield FoodIngredientUtils_1.queryFoodsIngredients(FoodId);
        res.status(200).json({ foodItem });
    }),
    userAddToCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foodId = req.params.FoodId;
        const userId = req.user.uid;
        const food = yield userUtils_1.addToCart(userId, foodId);
        if (food) {
            res.status(200).json({ food, msg: "Added To Cart" });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    viewCartItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userUtils_1.getUserCartItems(req);
        if (user) {
            const cartPriceArray = user.cart.map((item) => item.price);
            const totalPrice = cartPriceArray.reduce((prev, curr) => {
                return prev + curr;
            }, 0);
            res.status(200).json({ user, totalPrice });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    removeItemFromCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foodId = req.params.foodId;
        const food = yield userUtils_1.removeFromCart(foodId);
        if (food) {
            res.status(200).json({ food });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    userOrderFood: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { orderType, couponCode } = req.body;
        if (couponCode) {
            const coupon = yield Coupon_1.Coupon.findOne({
                where: { title: couponCode, valid: true },
            });
            if (coupon) {
                coupon.count += 1;
                yield coupon.save();
                const order = yield userUtils_1.OrderItems(req.user.uid, orderType, coupon.value);
                res.status(200).json({
                    order,
                    msg: `Order Placed, Coupon Code found used ${coupon.value}% Discount!`,
                });
            }
            else {
                res.json({ msg: "Invalid Coupon or Coupon expired" });
            }
        }
        else {
            const order = yield userUtils_1.OrderItems(req.user.uid, orderType);
            res.status(200).json({ order, msg: "Order Placed" });
        }
    }),
    userGetAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield userUtils_1.ViewOrderedItems(req.user.uid);
        res.status(200).json({ order });
    }),
    userViewSpecificOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield userUtils_1.ViewSpecificOrder(req.params.OrderId);
        if (order) {
            res.status(200).json({ order });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
    userCancelSpecificOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const orderId = req.params.OrderId;
        const { reason } = req.body;
        const order = yield userUtils_1.CancelOrder(orderId);
        if (order) {
            res.status(200).json({
                order,
                msg: "Order Cancelled, You will be refurbished",
                reason,
            });
        }
        else {
            res.status(500).json({
                msg: "Order not Cancelled, Order Either doesn't exsit or already Delivered",
            });
        }
    }),
    rateRestaurant: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { rating, review, } = req.body;
        const rateRestaurant = yield userUtils_1.RateRestaurant(req.user.uid, req.params.Rid, rating, review);
        if (rateRestaurant) {
            res.status(200).json({ rateRestaurant });
        }
        else {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }),
};
//# sourceMappingURL=user.controllers.js.map