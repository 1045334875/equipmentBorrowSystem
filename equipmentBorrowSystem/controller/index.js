const { use } = require("../routes/user");
const adminController = require("./admin");
const userController = require("./user");

<<<<<<< HEAD
=======
// 取消controller命名，调用起来更简洁
>>>>>>> main
// exports.controller = {
//     adminController: adminController,
//     userController: userController
// }
<<<<<<< HEAD

=======
>>>>>>> main
module.exports = {
    adminController: adminController,
    userController: userController
}
