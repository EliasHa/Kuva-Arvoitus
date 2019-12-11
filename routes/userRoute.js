'use strict';

const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const userController = require('../controllers/userController');

router.post('/', [
    body('name', 'minimum 3 characters').isLength({min: 3}),
    body('email', 'email is not valid').isEmail(),
    body('passwd', 'at least one upper case letter').
    matches('(?=.*[A-Z]).{8,}'),
    sanitizeBody('name').escape(),
], userController.user_create_post);


module.exports = router;