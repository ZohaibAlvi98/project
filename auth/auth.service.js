'use strict';
var compose = require('composable-middleware');
const jwt = require('jsonwebtoken')

var UserModel = require("../api/user/user.model")


function isAuthenticated() {
 
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
        
          try{
            const decoded = jwt.verify(req.header('token'),'car-parked-app-@Secret@12')
            req.userData = decoded;
            next();
          }catch(e){
            res.send({
              success: false,
              message: "Auth failed"
            })
          }
        
        });
}
exports.isAuthenticated = isAuthenticated;


