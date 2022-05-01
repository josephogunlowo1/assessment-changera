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
exports.DBUpdate1622825694992 = void 0;
class DBUpdate1622825694992 {
    constructor() {
        this.name = 'DBUpdate1622825694992';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `address` (`Addressid` varchar(36) NOT NULL, `city` text NOT NULL, `state` text NOT NULL, `Country` text NOT NULL, `location` text NOT NULL, `pincode` text NOT NULL, PRIMARY KEY (`Addressid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `delivery__person` (`DPid` varchar(36) NOT NULL, `name` text NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `REL_d65d42e963f8429d86825db38a` (`addressAddressid`), PRIMARY KEY (`DPid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `ingredient` (`Ingid` varchar(36) NOT NULL, `name` text NOT NULL, PRIMARY KEY (`Ingid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `food_ingredient` (`FoodId` varchar(255) NOT NULL, `IngredientId` varchar(255) NOT NULL, PRIMARY KEY (`FoodId`, `IngredientId`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `restaurant` (`Rid` varchar(36) NOT NULL, `name` text NOT NULL, `tag` text NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `REL_4642c5775e0de2541be48c84c8` (`addressAddressid`), PRIMARY KEY (`Rid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `user` (`uid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `userName` text NOT NULL, `password` text NOT NULL, `balance` int NOT NULL DEFAULT '0', `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `REL_703e68a3d29a874f160ac3797b` (`addressAddressid`), PRIMARY KEY (`uid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `food` (`Fid` varchar(36) NOT NULL, `name` text NOT NULL, `description` text NOT NULL, `quantity` int NOT NULL DEFAULT '1', `price` float NOT NULL, `restaurantId` varchar(255) NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `userId` varchar(255) NULL, `orderOid` int NULL, PRIMARY KEY (`Fid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `order` (`Oid` int NOT NULL AUTO_INCREMENT, `totalPrice` int NOT NULL DEFAULT '0', `type` enum ('COD', 'NET_BANKING') NOT NULL DEFAULT 'COD', `status` enum ('PLACED', 'PAYED', 'ON_TRANSPORT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PLACED', `uid` varchar(255) NOT NULL, `Rid` varchar(255) NOT NULL, `adminId` varchar(255) NOT NULL, `DPId` varchar(255) NOT NULL, PRIMARY KEY (`Oid`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `admin` (`Adminid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `name` text NOT NULL, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_de87485f6489f5d0995f584195` (`email`), UNIQUE INDEX `REL_d6c750b9aa7b055373e252ee7d` (`addressAddressid`), PRIMARY KEY (`Adminid`)) ENGINE=InnoDB");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`delivery__person` DROP FOREIGN KEY `address`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` DROP FOREIGN KEY `FK_b335b1a8e5221d9f0d79dae5f42`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food` DROP FOREIGN KEY `FK_35d14f4d6fd4c47ae086fad66f4`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_e078b2c868af143fdbc9ef86d6a`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food` DROP FOREIGN KEY `FK_405e37729fbcf3e41b4d91bcd42`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` DROP FOREIGN KEY `FK_b2786654cafd09256c540749b9a`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
            yield queryRunner.query("ALTER TABLE `delivery__person` ADD CONSTRAINT `FK_d65d42e963f8429d86825db38a1` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `food_ingredient` ADD CONSTRAINT `FK_b2786654cafd09256c540749b9a` FOREIGN KEY (`FoodId`) REFERENCES `food`(`Fid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `food_ingredient` ADD CONSTRAINT `FK_b335b1a8e5221d9f0d79dae5f42` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient`(`Ingid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_7c9492140866fe2a0867b381dcf` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_5ed8e55796b747240eff8d82b8a` FOREIGN KEY (`userId`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_29886cb97b270fea6d0b1889514` FOREIGN KEY (`orderOid`) REFERENCES `order`(`Oid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e078b2c868af143fdbc9ef86d6a` FOREIGN KEY (`Rid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
            yield queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
            yield queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e078b2c868af143fdbc9ef86d6a`");
            yield queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
            yield queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
            yield queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_29886cb97b270fea6d0b1889514`");
            yield queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_5ed8e55796b747240eff8d82b8a`");
            yield queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_7c9492140866fe2a0867b381dcf`");
            yield queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
            yield queryRunner.query("ALTER TABLE `restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
            yield queryRunner.query("ALTER TABLE `food_ingredient` DROP FOREIGN KEY `FK_b335b1a8e5221d9f0d79dae5f42`");
            yield queryRunner.query("ALTER TABLE `food_ingredient` DROP FOREIGN KEY `FK_b2786654cafd09256c540749b9a`");
            yield queryRunner.query("ALTER TABLE `delivery__person` DROP FOREIGN KEY `FK_d65d42e963f8429d86825db38a1`");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` ADD CONSTRAINT `FK_b2786654cafd09256c540749b9a` FOREIGN KEY (`FoodId`) REFERENCES `food`(`Fid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food` ADD CONSTRAINT `FK_405e37729fbcf3e41b4d91bcd42` FOREIGN KEY (`userUid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_e078b2c868af143fdbc9ef86d6a` FOREIGN KEY (`Rid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food` ADD CONSTRAINT `FK_35d14f4d6fd4c47ae086fad66f4` FOREIGN KEY (`restaurantRid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` ADD CONSTRAINT `FK_b335b1a8e5221d9f0d79dae5f42` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient`(`Ingid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`delivery__person` ADD CONSTRAINT `address` FOREIGN KEY (`addressAddressid`) REFERENCES `delivery__person`(`DPid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
            yield queryRunner.query("DROP INDEX `REL_d6c750b9aa7b055373e252ee7d` ON `admin`");
            yield queryRunner.query("DROP INDEX `IDX_de87485f6489f5d0995f584195` ON `admin`");
            yield queryRunner.query("DROP TABLE `admin`");
            yield queryRunner.query("DROP TABLE `order`");
            yield queryRunner.query("DROP TABLE `food`");
            yield queryRunner.query("DROP INDEX `REL_703e68a3d29a874f160ac3797b` ON `user`");
            yield queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
            yield queryRunner.query("DROP TABLE `user`");
            yield queryRunner.query("DROP INDEX `REL_4642c5775e0de2541be48c84c8` ON `restaurant`");
            yield queryRunner.query("DROP TABLE `restaurant`");
            yield queryRunner.query("DROP TABLE `food_ingredient`");
            yield queryRunner.query("DROP TABLE `ingredient`");
            yield queryRunner.query("DROP INDEX `REL_d65d42e963f8429d86825db38a` ON `delivery__person`");
            yield queryRunner.query("DROP TABLE `delivery__person`");
            yield queryRunner.query("DROP TABLE `address`");
        });
    }
}
exports.DBUpdate1622825694992 = DBUpdate1622825694992;
//# sourceMappingURL=1622825694992-DBUpdate.js.map