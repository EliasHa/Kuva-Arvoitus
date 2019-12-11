'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJTW = require('passport-jwt');
const JWTStrategy = passportJTW.Strategy;
const ExtractJWT = passportJTW.ExtractJwt;
const userModel = require('../models/userModel');

passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username];
        try {
            const [user] = await userModel.getUserLogin(params);
            console.log('Local strategy', user);
            if (user === undefined){
                return done(null, false, {message: 'Incorrect email.'});
            }
            if (user.password !== password){
                return done (null, false, {message: 'Incorrect password.'});
            }
            return done (null, {...user}, {message: 'Logged In Successfully'});
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'ilenWksp2019',
    },
    async (jwtPayload, done) => {
        console.log('payload', jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            const [user] = await userModel.getUser(jwtPayload.user_id);
            if(user === undefined)
                return done(null, false);

            return done(null, {...user});
        } catch (err) {
            return done(err);
        }
    },
));

module.exports = passport;