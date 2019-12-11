'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const loginWrapper = document.querySelector('#login-wrapper');
const logOut = document.querySelector('#log-out');
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
        sessionStorage.setItem('token', json.token);
        loginWrapper.style.display = 'none';
        logOut.style.display = 'block';
    }
});

if (sessionStorage.getItem('token')) {
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
}