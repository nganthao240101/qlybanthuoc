import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt-nodejs";

import config from "./config";
import db from "./models/index";

// var TokenExtractor = function (req) {
//   var token = null;
//   if (req && req.cookies) {
//     token = req.cookies["XSRF-token"];
//   }
//   if (!token && req.headers["authorization"]) {
//     token = req.headers["authorization"];
//   }
//   return token;
// };

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: 1,
    },
    async (payload, done) => {
      try {
        console.log(payload);
        var user = await db.User.findOne({ where: { id: payload.sub } });

        if (new Date(payload.exp) < new Date()) {
          return done("expired", false);
        }

        if (!user) {
          return done("user", false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// passport.use(
//   "user-local",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       try {
//         const user = await db.User.findOne({ where: { email: email } });
//         if (!user) {
//           return done(null, false);
//         }

//         if (user.status == "inactive") {
//           return done("invalid", false);
//         }

//         if (user.attempt == 5) {
//           return done("attempt", false);
//         }

//         var isMatch = bcrypt.compareSync(password, user.password);

//         if (!isMatch) {
//           user.update({
//             attempt: user.attempt + 1,
//           });
//           return done("attempt:" + (5 - user.attempt), false);
//         } else {
//           user.update({ attempt: 0 });
//         }
//         done(null, user);
//       } catch (error) {
//         console.log(error);
//         done(error, false);
//       }
//     }
//   )
// );

// passport.use(
//   "customer-local",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       try {
//         const user = await db.Customer.findOne({ where: { email: email } });
//         if (!user) {
//           return done(null, false);
//         }

//         if (user.status == "inactive") {
//           return done("invalid", false);
//         }

//         if (user.attempt == 5) {
//           return done("attempt", false);
//         }

//         var isMatch = bcrypt.compareSync(password, user.password);

//         if (!isMatch) {
//           user.update({
//             attempt: user.attempt + 1,
//           });
//           return done("attempt:" + (5 - user.attempt), false);
//         } else {
//           user.update({ attempt: 0 });
//         }
//         done(null, user);
//       } catch (error) {
//         console.log(error);
//         done(error, false);
//       }
//     }
//   )
// );
