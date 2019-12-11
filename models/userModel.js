'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const addUser = async (user) => {
    try {
        const [rows] = await promisePool.query('INSERT INTO users (user_email,user_name,user_pwd) VALUES (?,?,?);', user);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    addUser
};