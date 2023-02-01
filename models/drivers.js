const db = require('../util/database');

module.exports = class Driver {
    constructor(id){
        this.id = id;
    }
    // return db.execute('INSERT INTO products (type,weight,length,breadth,picture,pickup_address,drop_address,alternate_phone_number,c_status,customer_id) VALUES (?, ?, ?, ? , ? ,? ,? ,?,?,?)',

    save(){
        // console.log('herer');
        return db.execute(`INSERT INTO drivers (id) VALUES ('${this.id}')`)
    }
    }