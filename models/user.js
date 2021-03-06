const mongoose = require('mongoose');
var bycrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: {type:String, unique:true},
    // fullname: {type:String, unique:true,default:''},
    email: {type:String, unique:true},
    password: {type:String, default:''},
    // userImage: {type:String, default:'default.png'},

});


userSchema.methods.encryptPassword = function(password){
    return bycrypt.hashSync(password, bycrypt.genSaltSync(10),null);
}

userSchema.methods.validUserPassword = function(password){
    return bycrypt.compareSync(password,this.password);
}


module.exports = mongoose.model('User',userSchema);
