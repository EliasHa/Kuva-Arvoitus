'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const userInfo = document.querySelector('#user-info');
const addUserForm = document.querySelector('#add-user-form');

addUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addUserForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    console.log('user add response', json);
    // save token
    sessionStorage.setItem('token', json.token);
    // show/hide forms + cats
});