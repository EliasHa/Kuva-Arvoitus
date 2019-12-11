'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const userRoute = require('./routes/userRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));