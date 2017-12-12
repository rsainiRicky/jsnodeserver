var express = require('express');
var router = express.Router();
var authController = require('../../controllers/authenticationController');
var usersController = require('../../controllers/usersController');

router.get('/', function (req, res) {
    //GET /api/users
    usersController.userGetAll(req, res);
});

router.post('/register', function (req, res) {
    //  POST /api/users/register
    console.log('POST /api/users/register', req.body);
    authController.userRegister(req, res);
});

module.exports = router;
