'use strict';
const express = require('express');
const passport = require('./utils/pass');
const app = express();
const port = 3000;
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));