const adminModel = require("./admin");
const userModel = require("./user");

// 取消module命名，调用更简洁
// exports.module = {
//     adminModule: adminModule,
//     userModule: userModule
// }

module.exports = {
    adminModel: adminModel,
    userModel: userModel
}