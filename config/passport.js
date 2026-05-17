const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const bcrypt         = require('bcrypt');
const User           = require('../models/adminModels');

// ── Strategy ──────────────────────────────────────────────────────────────────
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
          return done(null, false, { message: 'No account found with that email.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  )
);

// ── Serialize / Deserialize ───────────────────────────────────────────────────
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
