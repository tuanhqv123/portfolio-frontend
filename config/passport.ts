import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User";

const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:
          process.env.NODE_ENV === "production"
            ? "https://portfolio-backend-weld-two.vercel.app/api/auth/google/callback"
            : "http://localhost:5001/api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0].value });

          if (!user) {
            user = await User.create({
              username: profile.displayName,
              email: profile.emails?.[0].value,
              googleId: profile.id,
              password: Math.random().toString(36).slice(-8),
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
};

export default initializePassport;
