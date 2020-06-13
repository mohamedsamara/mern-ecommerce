const passport = require('passport');

module.exports = (req, res, next) => {
  //   passport.authenticate('jwt', error => {
  //     if (error) {
  //       return res.status(401).json({
  //         message: 'Sorry, you are not authorized to access this resource.'
  //       });
  //     }

  //     console.log('is here');

  //     return next();
  //   });

  passport.authenticate('jwt', { session: false });
};
