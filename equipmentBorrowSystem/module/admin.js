const pool = require("./pool");
const mysql = require("mysql2");

exports.getEquipmentOnLoan = async() => {
    try {
        var conn = await pool.getConnection();

        var timeStamp = (new Date()).getTime();
        // let equipmentSql = 
        //     "SELECT equipmentID, equipmentName, equipmentPicture, returnTime FROM borrow_apply WHERE returnTime >= ? and startTime <= ?";
        let equipmentSql = "SELECT equipmentID, equipmentName, equipmentPicture, returnTime FROM equipment WHERE state == ?";
        let equipmentParam = [1];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);
        
        return equipmentRes[0];
    } catch {
        console.log("getEquipmentOnLoan Module Error");
        return null;
    } finally {
        await conn.release();
    }
}

exports.getEquipmentOnLoanMsg = async(equipmentID) => {
    try {
        var conn = await pool.getConnection();

        let equipmentSql = "SELECT state FROM equipment WHERE equipmentID == ?";
        let equipmentParam = [equipmentID];
        let equipmentRes = await conn.query(equipmentSql, equipmentParam);

        if(equipmentRes[0][0].state == 1) {
            let equipmentSql1 = "SELECT equipmentID, equipmentName, equipmentPicture, isCamera FROM equipment WHERE equipmentID == ?";
            let equipmentParam1 = [equipmentID];
            let equipmentRes1 = await conn.query(equipmentSql1, equipmentParam1);
            
            let timeStamp = (new Date()).getTime();
            let equipmentSql2 = 
                "SELECT stuID, startTime, returnTime, contactInfo FROM borrow_apply WHERE equipmentID == ? AND startTime <= ? AND endTime >= ?";
            let equipmentParam2 = [equipmentID, timeStamp, timeStamp];
            let equipmentRes2 = await conn.query(equipmentSql2, equipmentParam2);
            
            let result = {
                errorCode: 200,
                equipmentID: equipmentRes1[0][0].equipemntID,
                equipmentName: equipmentRes1[0][0].equipmentName,
                equipmentPicture: equipmentRes1[0][0].equipmentPicture,
                isCamera: equipmentRes1[0][0].isCamera,
                name: stuID,
                startTime: equipmentRes2[0][0].startTime,
                returnTime: equipmentRes2[0][0].returnTime,
                contactInfo: equipmentRes2[0][0].contactInfo
            }

        } else {
            let result = {errorCode: 400}
            return result;
        } 
    } catch {
        console.log("getEquipmentOnLoanMsg Module Error");
        return null;
    } finally {
        await conn.release();
    }
}