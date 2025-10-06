import jwt from "jsonwebtoken";

// Admin Auth Middleware

const authAdmin = (req, res, next) => {
    try {
        const {atoken} = req.headers;

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
            error: error.message,
        });
    }

    
}
export default authAdmin;