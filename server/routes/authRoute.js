import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken"

const router = Router()

router.post('/login', async(req, res, next) => {
   
    passport.authenticate('local', { session: false }, (err, user, info) => {
         
        if (err) return next(err);
        if (!user){
            return res.status(400).json({
                message: info.message || "Login failed"
            })
        }

        user.password = undefined

        console.log(user);
        
        
        // Generate JWTs
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({id: user.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'} )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        return res.status(200).json({
            message: 'Login successful',
            token
        })
    })(req, res, next);
})

export default router