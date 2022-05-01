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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../entities/User");
const Admin_1 = require("../entities/Admin");
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: `${process.env.SECRET}`,
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.isAdmin) {
        try {
            const user = yield User_1.User.findOne(payload.sub);
            if (user) {
                return done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            return done(err, false);
        }
    }
    else {
        try {
            const admin = yield Admin_1.Admin.findOne(payload.sub);
            if (admin) {
                return done(null, admin);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            return done(err, false);
        }
    }
})));
//# sourceMappingURL=isAuth.js.map