'use strict';

const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const jwt = require('jsonwebtoken')

var moment = require('moment'); // require


// const UserService = require('./user.service');
const LocationModel = require('./location.model'); 


exports.location = async(req,res)=>{
    try{

    await LocationModel.findOne({userId: req.userData.userId, validTime: true},async(err,loc)=>{
    
    const now = moment()
     
    if(moment(now, "DD.MM.YYYY HH:mm").isBefore(moment(loc.duration, "DD.MM.YYYY HH:mm"))){
       
        console.log(moment.utc(moment(loc.duration,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).local().format("HH:mm:ss"))
        const time = moment.utc(moment(loc.duration,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).local().format("HH:mm:ss")
        res.send({
            success: true,
            location: loc,
            remaining: time,
            message: `Time is Remaining: ${time}`
 
        })
      }else{
       res.send({
           success: true,
           message: 'Time is up'

       })
          
      }
//     console.log(now)
//     var duration = moment.duration(now.diff(loc.duration))
//     console.log(loc.duration)
//    console.log(duration)
//     let min = duration.asMinutes()
//     console.log(min)
//       let h = duration.asHours()
//       console.log(h)
//        if(min < 0){
//         min = Math.abs(min)
//         let m = Math.round(min%60)
        
//         let hr = Math.floor(min/60)
//         let remaining = `${hr} hours : ${m} mins`;
//         res.send({
//             success: true,
//             location:loc,
//             remaining: remaining,
//             message: 'Time is remaining'
//         })
//        }else{
           
//             let m = min%60
//             let hr = Math.round(min/60)
//             let remaining = `${hr}:${m}`;
//             res.send({
//                 success: true,
//                 location:loc,
//                 remaining: remaining,
//                 message: 'Time is up!!!'
           
//            })
//        }
        
    })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.createLocation = async(req,res)=>{
   try{
       req.body['userId'] = req.userData.userId
       const hours = req.body['duration'].split(':')[0]
       const minute = req.body['duration'].split(':')[1]

    //    var now  = "04/09/2013 15:00:00";
var then = "04/09/2013 18:20:30";
const now = moment()

       req.body['duration'] = moment().add({'hours':hours,'minutes': minute}).format("DD/MM/YYYY HH:mm:ss")
       
    
        await LocationModel.create(req.body,async(err,loc)=>{
            res.send({
                success: true,
                location:loc
            })
        })
   }catch(e){
       res.send({
           success: false,
           message: e.message
       })
   }
}