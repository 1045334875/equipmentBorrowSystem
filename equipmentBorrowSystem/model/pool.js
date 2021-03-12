var mysql =require("mysql2/promise");

module.exports = (function(){
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
<<<<<<< HEAD
        password: 'cairile',
        database: 'equipmentborrowsystem2.0',
=======
        password: 'Apocrypha332528',
        database: 'equipmentborrowsystem',
>>>>>>> 882119954e3b608c81966f220b00ed6f938f07af
    })
    
    pool.on("connection",function(connection){
        connection.query("SET SESSION auto_increment_increment=1");
    });
    return pool;
    
})();