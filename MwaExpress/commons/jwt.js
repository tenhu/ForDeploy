
const jwt = require('jsonwebtoken');
const settings = require('../hidden');

module.exports = (grantedRoles)=>{
    return (req,res,next)=>{
    let token = req.get('Authorization');
    if(token != null && token > ''){
        token = token.slice(token.indexOf(' ') + 1, token.length);//remove prefix like Bearer,JWT...
        jwt.verify(token, settings.jwtsecretekey, function(err, decoded){
            if(!err && decoded){
                    req.user = decoded;
                    if(grantedRoles==null || grantedRoles == "*"){
                        return next();
                    }

                    granted = false;
                    req.user.roles.forEach((r)=>{
                        if(!granted && ((typeof grantedRoles == 'string' && grantedRoles == r)
                                            ||(typeof grantedRoles != 'string' && grantedRoles.indexOf(r)>=0))){
                            granted = true;
                        }
                    });  
                    if(!granted){
                        return next("Access denied");
                    }else{
                        return next();
                    }
            }else{
                return next(err.message);
            }
            return next("Access denied");
        });
    }else{
        return next("Access denied");
    }
}
}