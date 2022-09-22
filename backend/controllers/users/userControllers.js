const { validationResult } = require('express-validator');
const userModel = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../../config/envConfig');

// register @POST route
// @access Public
// @desc: Create User and return a token
const register = async(req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            // check if email exists
            const emailExist = await userModel.findOne({ email });

            if(!emailExist) { // if it doesn't
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await userModel.create({
                    name,
                    email,
                    password: hashedPassword,
                    admin: true
                });

                // return jwt token if user is created successfully
                const token = jwt.sign({ id: user._id, name: user.name }, env.JWT_KEY, {
                    expiresIn: '7d'
                });

                return res.status(201).json({ 
                    msg: 'Your account has been created!',
                    token 
                });
            } else {
                return res.status(401).json({errors: [{msg: `${email} already exists.`}] })
            }
        } catch(err) {
            console.log(err.message);
            return res.status(500).json("Server Internal Error");
        }
    } else {
        // validation failed
        return res.status(400).json({ errors: errors.array() });
    }
}

// login @POST route
// @access Public
// @desc: Login User and return a token
const login = async(req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        try {
            const user = await userModel.findOne({ email });
            // check if the user exists
            if(user) {
                // compare passwords
                const result = await bcrypt.compare(password, user.password);

                if(result) {
                    // check if user is admin or a normal user
                    const token = jwt.sign({ id: user._id, name: user.name }, env.JWT_KEY, {
                        expiresIn: '7d'
                    });

                    if(user.admin) {
                        return res.status(201).json({ token, admin: true });
                    } else {
                        return res.status(201).json({ token, admin: false });
                    }

                } else {
                    return res.status(401).json({errors: [{ "msg": 'passwords do not match' }] });
                }
            } else {
                return res.status(401).json({ errors: [{ "msg": `${email} is not found` }] });
            }
        } catch(err) {  
            console.log(err.message);  
            return res.status(500).json("Server Internal Error");
        }
    } else {
        // validations failed
        res.status(401).json({ errors: errors.array() });
    }
}

module.exports = {
    register,
    login
}