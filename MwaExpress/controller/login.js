
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const log = require('log4node');
const settings = require('../hidden');
const moment = require('moment');
const {ObjectId} = require('mongodb');

module.exports.login = (req,res,next) =>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username:username},(err, user) =>{
        if(user != null){
            bcrypt.compare(password, user.password).then(function(equal) {
                if(!equal){
                    res.status(200).json({error:"invalid user or password"});        
                }else{
                    if(user.username == 'admin' && user.roles.indexOf('admin')<0){
                        user.roles.push('admin');
                    }
                    let expDuration = 20;
                    var token = jwt.sign({ 
                        userid : user._id,
                        roles : user.roles,                        
                        exp:  Math.floor(Date.now() / 1000) + (60 * expDuration)
                    }, settings.jwtsecretekey);
                                        
                    res.status(200).json({succeeded:true,
                                            'data':{
                                                userinfo:{        
                                                    userid:user._id,
                                                    username:user.username,
                                                    name:user.name,
                                                    photo:user.photo,
                                                    roles : user.roles,                        
                                                    exp: moment().add(expDuration,'minute')
                                                }, 
                                                jwt:token}
                                            });        
                }
            });
        }else{
            res.status(200).json({'error':"invalid user or password"});        
        }
    });
}; 



module.exports.loginbytoken = (req,res,next) =>{
    let token = req.get('Authorization');
    jwt.verify(token, settings.jwtsecretekey, function(err, decoded){
        User.findById(decoded.userid, (err, user) =>{
            if(user != null){
                if(user.username == 'admin' && user.roles.indexOf('admin')<0){
                    user.roles.push('admin');
                }
                var token = token;
                                    
                res.status(200).json({succeeded:true,
                                        'data':{
                                            userinfo:{        
                                                userid:user._id,
                                                username:user.username,
                                                name:user.name,
                                                photo:user.photo,
                                                roles : user.roles,                        
                                                exp: moment().add(expDuration,'minute')
                                            }, 
                                            jwt:token}
                                        });     
            }else{
                res.status(200).json({'error':"invalid token"});        
            }
        });
    });
}; 

module.exports.checkusername = (req,res,next)=>{
    User.findOne({username:req.body.username},(err, u)=>{
        if(err){
            return next("Failed to check");
        }else{
            if(u){
                return res.status(200).json({error:"User existing"});
            }else{
                return res.status(200).json({succeeded:true});
            }
        }
    });
};

module.exports.signup = (req,res,next) =>{
    const u = new User({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password
    });
    u.save((err)=>{
        if (err){
            log.error(err);
            return res.status(200).json({error:"Failed to save"});
        } else{
            res.status(200).json({succeeded:true});
        }
    });
};
