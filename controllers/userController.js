'use strict';
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const user_create_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        const user = [
            req.body.name,
            req.body.email,
            req.body.passwd,
        ];
        const result = await userModel.addUser(user);
        await res.json(result);
    }
};

module.exports = {
    user_create_post
};