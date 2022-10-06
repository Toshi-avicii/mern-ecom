const { body } = require('express-validator');
const categoryValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('Category is required')
];

module.exports = categoryValidations;