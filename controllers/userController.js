'use strict';

const {validationResult} = require('express-validator');
//const bcrypt = require('bcryptjs');
//const salt = bcrypt.genSaltSync(10);
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const user_get = async (req, res) => {
    const user = await userModel.getUser(req.params.id);
    await res.json(user[0]);
};

const user_create_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        //const hash = bcrypt.hashSync(req.body.password, salt);
        const params = [
            req.body.email,
            req.body.username,
            req.body.password,
            //hash
        ];
        const response = await userModel.addUser(params);
        const user = await userModel.getUser([response.insertId]);
        await res.json(user);
    }
};

module.exports = {
    user_create_post, user_get, user_list_get
};