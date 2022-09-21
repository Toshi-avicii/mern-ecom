const { body } = require('express-validator');

const registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Email is required'),
    body('password').trim().isLength({min: 5}).escape().withMessage('Password must be at least 6 characters long')
];

module.exports = {
    registerValidations
}