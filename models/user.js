const db = require('../util/database');

module.exports = class User {
    constructor(id,Name,Email,PhoneNumber,Country,State,City,ZipCode,OTP,Designation){
        this.id = id;
        this.Name = Name;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Country = Country;
        this.City = City;
        this.ZipCode = ZipCode;
        this.OTP = OTP;
        this.Designation = Designation;
        this.State = State;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM users');
    }

    save(){
// console.log(this.Name,this.PhoneNumber,this.Country,this.Email,this.State,this.City,this.ZipCode,this.OTP,this.Designation);

        return db.execute('INSERT INTO users (Name,PhoneNumber,Country,Email,State,City,Zipcode,OTP,Designation) VALUES (? , ?, ?, ? , ? ,? ,? ,?,? )',
        [this.Name,this.PhoneNumber,this.Country,this.Email,this.State,this.City,this.ZipCode,this.OTP,this.Designation]);
    }

    static findByPhoneNumber( number ){

        return db.execute(`SELECT OTP FROM users WHERE PhoneNumber = ${number}` )
        // number = number.toInt();
    }


}