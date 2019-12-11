'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const loginWrapper = document.querySelector('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-cat-form');
const modForm = document.querySelector('#mod-cat-form');
const ul = document.querySelector('ul');
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

// close modal
close.addEventListener('click', (evt) => {
    evt.preventDefault();
    imageModal.classList.toggle('hide');
});

// AJAX call


// login
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
        // save token
        sessionStorage.setItem('token', json.token);
        // show/hide forms + cats
        loginWrapper.style.display = 'none';
        logOut.style.display = 'block';
        main.style.display = 'block';
        userInfo.innerHTML = `Hello ${json.user.name}`;
        getUsers();
    }
});
/*
// logout
logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/auth/logout', options);
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        alert('You have logged out');
        // show/hide forms + cats
        loginWrapper.style.display = 'flex';
        logOut.style.display = 'none';
        main.style.display = 'none';
    }
    catch (e) {
        console.log(e.message);
    }
});

 */

// submit register form
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
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
    main.style.display = 'block';
    userInfo.innerHTML = `Hello ${json.user.name}`;
    getCat();
    getUsers();
});

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
if (sessionStorage.getItem('token')) {
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
    main.style.display = 'block';
    getUsers();
}