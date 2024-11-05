import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Staff from '../models/staffModel.js';



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
  

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(id);
    
  try {
    const user = await Staff.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
