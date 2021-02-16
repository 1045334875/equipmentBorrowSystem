const adminController = require("./admin");
const userController = require("./user");

// 取消controller命名，调用起来更简洁
// exports.controller = {
//     adminController: adminController,
//     userController: userController
// }
module.exports = {
    adminController: adminController,
    userController: userController
}