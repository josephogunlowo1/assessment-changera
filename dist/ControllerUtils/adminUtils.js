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
exports.ControlOrder = exports.ViewOrderAssigned = exports.uploadImagesForFood = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("../entities/Order");
const fs_1 = __importDefault(require("fs"));
const Image_1 = require("../entities/Image");
const uploadPath = "/uploads/dishes";
const path_1 = __importDefault(require("path"));
const uploadImagesForFood = (req, food) => __awaiter(void 0, void 0, void 0, function* () {
    let images = [];
    let fileName = new Date().getTime();
    const files = req.files;
    yield files.forEach((file, index) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!fs_1.default.existsSync(path_1.default.normalize(`${__dirname}/../..${uploadPath}/${fileName}`))) {
                fs_1.default.mkdirSync(path_1.default.normalize(`${__dirname}/../..${uploadPath}/${fileName}`));
            }
            fs_1.default.writeFile(path_1.default.normalize(`${__dirname}/../..${uploadPath}/${fileName}/${fileName}${index}.${file.mimetype.split("/")[1]}`), file.buffer, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(path_1.default.normalize(`${__dirname}/../..${uploadPath}/${fileName}/${fileName}${index}.${file.mimetype.split("/")[1]}`));
            });
            const img = yield Image_1.Image.create({
                imagePath: `${uploadPath}/${fileName}/${fileName}${index}.${file.mimetype.split("/")[1]}`,
                food,
            }).save();
            images.push(img);
        }
        catch (e) {
            console.log(e);
            console.log("Error in saving");
            return;
        }
    }));
    return images;
});
exports.uploadImagesForFood = uploadImagesForFood;
const ViewOrderAssigned = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield typeorm_1.getRepository(Order_1.Order)
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.admin", "admin")
        .leftJoinAndSelect("order.Items", "food")
        .where("order.adminId = :adminId", { adminId })
        .getMany();
    return order;
});
exports.ViewOrderAssigned = ViewOrderAssigned;
const ControlOrder = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne(orderId);
    if (order) {
        order.status = status;
        yield order.save();
        return order;
    }
    else {
        return undefined;
    }
});
exports.ControlOrder = ControlOrder;
//# sourceMappingURL=adminUtils.js.map