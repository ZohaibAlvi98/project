'use strict';

var express = require('express');
var controller = require('./location.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/get',auth.isAuthenticated(), controller.location);

router.post('/create',auth.isAuthenticated(), controller.createLocation);


module.exports = router;
