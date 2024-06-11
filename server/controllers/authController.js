// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const creatError = require('../utils/appError');

// Register user (already implemented in your code)
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new creatError('User already exists', 400));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new creatError('Please provide email and password', 400));
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new creatError('Incorrect email or password', 401));
        }

        const token = jwt.sign({ _id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
};
