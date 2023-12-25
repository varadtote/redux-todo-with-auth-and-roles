import asyncHandler from 'express-async-handler';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import isAlpha from 'validator/lib/isAlpha.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
dotenv.config()

// @desc Register a new user
// route POST /api/auth/register
// @acess Public
export const registerHandler = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    // // Validate email, password, and name
    // if (!isEmail(email) || !isStrongPassword(password) || !isAlpha(name)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Invalid input. Please check your email, password, and name.',
    //     });
    // }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists. Please choose another email.',
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: {
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                },
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @desc Login user
// route POST /api/auth/login
// @acess Public
export const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format.',
        });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        // If the user doesn't exist or the password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // If email and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: '30d', // Token expiration time (adjust as needed)
        });

        res.setHeader('Set-Cookie', [`token=${token}`], { httpOnly: true },
            { maxAge: 3600000 })
        // Save the token in a cookie
        // res.cookie('token', token, {

        // });

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

export const tokenHandler = asyncHandler(async (req, res) => {
    const userToken = req.cookies.token;
    return res.send(userToken)
})

// @desc Logout user
// route POST /api/auth/logout
// @acess Public
export const logoutHandler = asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');

    return res.status(200).json({
        success: true,
        message: 'Logout successful.',
    });
});