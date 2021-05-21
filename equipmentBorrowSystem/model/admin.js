const pool = require("./pool");
const mysql = require("mysql2");


//添加设备
exports.putEquipmentAdd = async (
    equipmentID,
    equipmentName,
    equipmentPicture,
    longestBorrowTime,
    isCamera
) => {
    try {
        var conn = await pool.getConnection();
        
        let equipmentSql =
            " INSERT INTO equipment (equipmentID,equipmentName,equipmentPicture,longestBorrowTime,isCamera,state) VALUES (?,?,?,?,?,0)";
        let equipmentParam = [
            equipmentID,
            equipmentName,
            equipmentPicture,
            longestBorrowTime,
            isCamera
        ];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        return 200;
    } catch (err) {
        console.log("putEquipmentAdd Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

// 删除设备
exports.deleteEquipmentDelete = async (
    equipmentID
) => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql =
            "DELETE FROM equipment WHERE equipmentID=?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        
        return 200;
    } catch (err) {
        console.log("deleteEquipmentDelete Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};

// 获取设备借出状态
exports.getEquipmentState = async (
    equipmentID
) => {
    try {
        var conn = await pool.getConnection();
        
        let equipmentSql =
            "SELECT state FROM equipment WHERE equipmentID = ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
    
        if (!equipmentRes[0][0]) {
            throw new Error("equipmentID有误");
        }
        let state = equipmentRes[0][0].state;
        return state;
    } catch (err) {
        console.log("getEquipmentState Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}

// 获取借出设备
exports.getEquipmentOnLoan = async () => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql =
            "SELECT equipmentID, equipmentName, equipmentPicture FROM equipment WHERE state = ?";
        let equipmentParam = [1];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        let len = equipmentRes[0].length;

        let equipmentSql2 =
            "SELECT equipmentID, returnTime FROM borrow_apply WHERE state = ?";
        let equipmentParam2 = [1];
        let equipmentRes2 = await conn.query(equipmentSql2, equipmentParam2);
        let len2 = equipmentRes2[0].length;

        if (len != len2) {
            throw new Error("数据库出错啦!");
        }

        for (let count = 0; count < len; count++) {
            let equipmentID = equipmentRes[0][count].equipmentID;
            for (let count2 = 0; count2 < len; count2++) {
                if (equipmentID == equipmentRes2[0][count2].equipmentID) {
                    equipmentRes[0][count].returnTime = equipmentRes2[0][count2].returnTime;
                    break;
                }
            }
        }

        return equipmentRes[0];
    } catch (err) {
        console.log("getEquipmentOnLoan Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}

// 从equipment表获取某一设备借出设备信息
exports.getEquipmentOnLoanMsgFromEquipment = async (
    equipmentID
) => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql =
            "SELECT equipmentID, equipmentName, equipmentPicture, isCamera FROM equipment WHERE equipmentID = ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);

        if (!equipmentRes[0][0]) {
            throw new Error("equipment equipmentID有误");
        }

        return equipmentRes[0][0];
    } catch (err) {
        console.log("getEquipmentOnLoanMsgFromEquipment Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}

// 从borrow_apply表获取某一设备借出设备信息
exports.getEquipmentOnLoanMsgFromApply = async (
    equipmentID
) => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql =
            "SELECT stuID, startTime, returnTime, contactInfo FROM borrow_apply WHERE equipmentID = ? AND state = ?";
        let equipmentParam = [equipmentID, 1];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);

        if (!equipmentRes[0][0]) {
            throw new Error("borrow_apply equipmentID有误");
        }

        return equipmentRes[0][0];
    } catch (err) {
        console.log("getEquipmentOnLoanMsgFromApply Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}

// 获取某人的姓名
exports.getName = async (
    stuID
) => {
    try {
        var conn = await pool.getConnection();

        let userSql = "SELECT name FROM user_info WHERE stuID = ?";
        let userParam = [stuID];
        let userRes = await conn.query(userSql, userParam);

        if (!userRes) {
            throw new Error("学号给错啦");
        }

        return userRes[0][0].name;
    } catch (err) {
        console.log("getName Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}

// 判断某人是否为管理员
exports.isAdmin = async (
    id
) => {
    try {
        var conn = await pool.getConnection();

        let adminSql = "SELECT id FROM admin WHERE id = ?";
        let adminParam = [id];
        let adminRes = await conn.query(adminSql, adminParam);
        let ret = 1;
        
        if (!adminRes[0][0]) ret = 0;
        return ret;
    } catch (err) {
        console.log("isAdmin Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
}