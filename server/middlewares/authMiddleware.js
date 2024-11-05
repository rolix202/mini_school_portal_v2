export const isAunthenticated = (req, res, next) => {
    if (req.isAunthenticated()){
        return next()
    } else {
        res.status(401).json({
            message: "Unauthorized access. Please log in."
        })
    }
}