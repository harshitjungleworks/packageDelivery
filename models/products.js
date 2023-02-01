const db = require('../util/database');

module.exports = class Product {
//     type, weight, length, breadth, picture, pickup_address,
// drop_address, alternate_phone_number.
    constructor(id,type,weight,length,breadth,picture,pickup_address,drop_address,alternate_phone_number,c_status,customer_id){
        this.id = id;
        this.type = type;
        this.weight = weight;
        this.length = length;
        this.breadth = breadth;
        this.picture = picture;
        this.pickup_address = pickup_address;
        this.drop_address = drop_address;
        this.alternate_phone_number = alternate_phone_number;
        this.c_status = c_status;
        this.customer_id = customer_id;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }

    save(){
console.log(this.type,this.weight,this.length,this.breadth,this.picture,this.pickup_address,this.drop_address,this.alternate_phone_number,this.c_status,this.customer_id);
// console.log();
        return db.execute('INSERT INTO products (type,weight,length,breadth,picture,pickup_address,drop_address,alternate_phone_number,c_status,customer_id) VALUES (?, ?, ?, ? , ? ,? ,? ,?,?,?)',
        [ this.type,
            this.weight,
            this.length,
            this.breadth,
            this.picture,
            this.pickup_address,
            this.drop_address,
            this.alternate_phone_number,
            this.c_status,
            this.customer_id]);
    }

    static getRecordByCustomerId( id ){
        return db.execute(`SELECT * FROM products WHERE customer_id = ${id}` )
        // number = number.toInt();
    }

//     }


}