'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users;');
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUser = async (id) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM users WHERE user_id = ?;',
            [id]);
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const addUser = async (user) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO users (user_email,username,password) VALUES (?,?,?);', user);
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute(
            'SELECT * FROM users WHERE username = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    addUser, getUserLogin, getAllUsers, getUser
};