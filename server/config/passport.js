const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('./keys');
const { EMAIL_PROVIDER } = require('../constants');

const { google, facebook } = keys;
const { clientURL, apiURL } = keys.app;

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

module.exports = async app => {
  app.use(passport.initialize());

  await googleAuth();
  await facebookAuth();
};

const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: google.clientID,
          clientSecret: google.clientSecret,
          callbackURL: `${clientURL}/${apiURL}/${google.callbackURL}`
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ email: profile.email })
            .then(user => {
              if (user) {
                return done(null, user);
              }

              const name = profile.displayName.split(' ');

              const newUser = new User({
                provider: EMAIL_PROVIDER.Google,
                googleId: profile.id,
                email: profile.email,
                firstName: name[0],
                lastName: name[1],
                avatar: profile.picture,
                password: null
              });

              newUser.save((err, user) => {
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
  } catch (error) {
    console.log('Missing google keys');
  }
};

const facebookAuth = async () => {
  try {
    passport.use(
      new FacebookStrategy(
        {
          clientID: facebook.clientID,
          clientSecret: facebook.clientSecret,
          callbackURL: `${clientURL}/${apiURL}/${facebook.callbackURL}`,
          profileFields: [
            'id',
            'displayName',
            'name',
            'emails',
            'picture.type(large)'
          ]
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ facebookId: profile.id })
            .then(user => {
              if (user) {
                return done(null, user);
              }

              const newUser = new User({
                provider: EMAIL_PROVIDER.Facebook,
                facebookId: profile.id,
                email: profile.emails ? profile.emails[0].value : null,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatar: profile.photos[0].value,
                password: null
              });

              newUser.save((err, user) => {
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
  } catch (error) {
    console.log('Missing facebook keys');
  }
};
