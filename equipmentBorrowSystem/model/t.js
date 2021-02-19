const pool = require("./pool");
const mysql = require("mysql2");
let t = async (
    equipmentID
) => {
    try {
        //连接数据库
        var conn = await pool.getConnection();
        //SQL修改设备状态为未借出
        let equipmentRetSql =
            "UPDATE equipment SET state = 0 WHERE equipment = ?";
        let equipmentRetParam = [equipmentID];
        let equipmentRetRes = await conn.query(equipmentRetSql, equipmentRetParam);
        
        let result = 200;
        return result;
    } catch (err) {
        console.log("putEquipmentRet Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};
t(2);