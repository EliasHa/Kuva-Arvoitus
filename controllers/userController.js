'use strict';

const userModel = require('../models/userModel');

const user_create_post = async (req, res) => {
    const user = [
        req.body.email,
        req.body.name,
        req.body.passwd,
    ];
    const result = await userModel.addUser(user);
    await res.json(result);
};

module.exports = {
    user_create_post
};