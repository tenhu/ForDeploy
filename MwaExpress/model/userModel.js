const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        index:true,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:String,    
    roles:[String],
    photo: String
});

userSchema.pre('save', function(next){
    if(this.password != null && this.password>''){
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            this.password = hash;
            next();
        });        
    }else{
        next();
    }
});

userSchema.statics.initAdminUser = function(){
    this.findOne({username:'admin'},(e,u)=>{
        if(u==null){
            u = new User({
                username:'admin',
                password:'mwa',
                roles:['admin']
            });
            u.save();
        }
    });
};

const User = module.exports = mongoose.model('User', userSchema); 