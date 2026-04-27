import JWT from 'jsonwebtoken';
import UserModel from '../models/users.js';

// protect route token verification
export const requireSignIn = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

}

// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Admin access required: ', error: error.message });        
    }
}

// user access
export const isUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.user.email});
        console.log('User in isUser middleware: ', user);
        if (user.role !== 'user') {
            return res.status(403).json({ success: false, message: 'User access required' });
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'User access required: ', error: error.message });        
    }
}