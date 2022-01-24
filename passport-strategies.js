const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const { db, jwtSecret } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (formMail, formPassword, done) => {
      try {
        const [sqlRes] = await db.query(
          `SELECT id, email, firstname, lastname, password, picture, job, isLogged, cardNumber, amount, isInvited, eggFree, glutenFree, gmoFree, nutFree, sugarFree, cornFree, dairyFree, soyFree, transFatsFree, vegan, shellfishFree, porkFree, vegetarian, fridayFish, onDiet  FROM User WHERE email = ?`,
          [formMail]
        );
        if (!sqlRes.length) return done(null, false);
        const {
          id,
          email,
          firstname,
          lastname,
          password,
          picture,
          job,
          isLogged,
          cardNumber,
          amount,
          isInvited,
          eggFree,
          glutenFree,
          gmoFree,
          nutFree,
          sugarFree,
          cornFree,
          dairyFree,
          soyFree,
          transFatsFree,
          vegan,
          shellfishFree,
          porkFree,
          vegetarian,
          fridayFish,
          onDiet,
        } = sqlRes[0];
        const isPasswordOK = bcrypt.compareSync(formPassword, password);
        if (!isPasswordOK) return done(null, false, 'Wrong password!');

        const user = {
          id,
          email,
          firstname,
          lastname,
          picture,
          job,
          isLogged,
          cardNumber,
          amount,
          isInvited,
          eggFree,
          glutenFree,
          gmoFree,
          nutFree,
          sugarFree,
          cornFree,
          dairyFree,
          soyFree,
          transFatsFree,
          vegan,
          shellfishFree,
          porkFree,
          vegetarian,
          fridayFish,
          onDiet,
        };
        return done(null, user);
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
