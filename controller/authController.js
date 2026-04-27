import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import UserModel from "../models/users.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name){ return res.send({message: 'Name is required'})}
        if(!email){ return res.send({message: 'Email is required'})}
        if(!password){ return res.send({message: 'Password is required'})}

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await new UserModel({ name, email, password: hashedPassword }).save();
        console.log('New user created: ', newUser);

        res.status(201).send({
            success: true,
            message: 'User Register Successfully.', user: newUser
        })
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if( !email || !password){
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({ success: true, message: 'Login successful', token, user });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    }
}

export const getUserTasksController = async (req, res) => {
    // const searchEmail = req.query.email;
    //  console.log('Search Email: 1111111', searchEmail);
     console.log('Search Email: 1111111');
    /* try {
        const searchEmail = req.query.email;
        console.log('Search Email: ', searchEmail);
        const tasks = await TaskModel.find( o => o.assignedTo === searchEmail );
        res.status(200).send({ success: true, message: 'User tasks retrieved successfully', tasks });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error', error: error.message });
    } */
}