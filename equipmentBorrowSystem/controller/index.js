const { use } = require("../routes/user");
const adminController = require("./admin");
const userController = require("./user");

// exports.controller = {
//     adminController: adminController,
//     userController: userController
// }

module.exports = {
    adminController: adminController,
    userController: userController
}