import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../src/models/user.ts";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account does not have an email"),
            false,
          );
        }

        // Check if user already exists
        let user = await UserModel.findOne({
          googleId: profile.id,
        });

        // If user doesn't exist, create one
        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
            email,
            username:
              profile.displayName?.replace(/\s+/g, "").toLowerCase() ||
              `user_${profile.id}`,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            avatar: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

export default passport;
