const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('./keys');

const { clientID, clientSecret, callbackURL } = keys.google;
const { serverURL, apiURL } = keys.app;

const User = mongoose.model('User');
const secret = keys.jwt.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: `${serverURL}/${apiURL}/${callbackURL}`
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.email })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          const name = profile.displayName.split(' ');

          const createdUser = new User({
            provider: 'google',
            googleId: profile.id,
            email: profile.email,
            firstName: name[0],
            lastName: name[1],
            avatar: profile.picture
          });

          createdUser.save((err, user) => {
            if (err) {
              return done(err, false);
            }

            return done(null, user);
          });
        })
        .catch(err => {
          return done(err, false);
        });
    }
  )
);
