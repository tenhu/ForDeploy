
const User = require('../model/userModel');


module.exports.gettest = (req,res,next) =>{
     User.find({},{password:0},(err, data)=>{
          return res.status(200).json(data);
     });
}
