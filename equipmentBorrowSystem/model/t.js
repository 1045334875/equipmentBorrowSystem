const pool = require("./pool");
const mysql = require("mysql2");
let t = async (
    stuID
) => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql = 
            "SELECT equipmentID, startTime, returnTime FROM borrow_apply WHERE stuID = ?";
        let equipmentParam = [stuID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        
        let equipmentID = [];
        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentID[i] = equipmentRes[0][i].equipmentID;
        }
        
        let equipmentNameSql =
            "SELECT equipmentName FROM id_equipment WHERE equipmentID in (?)";
        let equipmentNameParam = [equipmentID];
        let equipmentNameRes = await conn.query(equipmentNameSql, equipmentNameParam);

        for ( let i = 0 ; i < equipmentRes[0].length ; i++) {
            equipmentRes[0][i].equipmentName = equipmentNameRes[0][i].equipmentName;
        }
        console.log(equipmentRes[0]);
    } catch (err) {
        console.log("getBorrrowedEquipment Model Error" + err);
        return null;
    } finally {
        await conn.release();
    }
};
t(2);