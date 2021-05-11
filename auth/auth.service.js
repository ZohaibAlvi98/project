'use strict';
var compose = require('composable-middleware');
const jwt = require('jsonwebtoken')

var UserModel = require("../api/user/user.model");
const userSessionModel = require('../api/userSession/userSession.model');


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


function isUserAuthenticated() {
  return compose()
      // Attach user to request
      .use(function(req, res, next) {
        req.query.token = req.header('token')
        console.log(req.query.token)
          userSessionModel.findById(req.query.token, (err,session)=>{
              if(session!=null&&session.isDeleted==false){
                  UserModel.findById(session.user, (err, user)=>{
                    let users = {
                      userId: user._id
                    }
                    req.userData = users
                      next();
                  })
              }else{
                  res.send({
                      success: false,
                      message: "login"
                  })
              }
          })
      });
}
exports.isAuthenticated = isAuthenticated;
exports.isUserAuthenticated = isUserAuthenticated;


