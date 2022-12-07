const {model} = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models').Users;

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
        return res.status(400).json({message: 'User does not exist'});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({message: 'Invalid password'});
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
    res.status(200).json({message: 'User logged in successfully', token});
};

const register = async (req, res) => {
    const {firstName, lastName, email, password, username, country_code, phone_number, address} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (user) {
        return res.status(400).json({message: 'User already exists'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        username,
        country_code,
        phone_number,
        address
    });
    const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET);
    res.status(201).json({message: 'User created successfully', token});
};

module.exports = {
    login,
    register
};