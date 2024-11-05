import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Staff from '../models/staffModel.js';
import jwt from 'jsonwebtoken';

export const configureJwtStrategy = () => {
    // Local Strategy for authentication
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
                    
          try {
            if (!email || !password) {
              return done(null, false, { message: 'Please provide email and password' });
            }
      
            const user = await Staff.findOne({ email }).select('+password');
            if (!user) {
              return done(null, false, { message: 'Incorrect email or password' });
            }
      
            const isMatch = await user.comparePassword(password, user.password);
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect email or password' });
            }
      
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      ));

    // JWT Strategy for securing routes
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
        console.log(payload);
        
        const user = await Staff.findById(payload.id);
        console.log(user);
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}