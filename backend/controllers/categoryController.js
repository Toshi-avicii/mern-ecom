const { validationResult } = require('express-validator');
const categoryModel = require('../models/Category');

async function createCategory (req, res) {
    const errors = validationResult(req);
    const { name } = req.body;
    if(errors.isEmpty()) {
        const existCategory = await categoryModel.findOne({ name });

        if(!existCategory) {
            await categoryModel.create({ name });
            res.status(201).json({
                msg: 'Category created successfully'
            });
        } else {
            res.status(401).json({
                errors: [{ msg: `${name} already exists` }]
            })
        }
    } else {
        res.status(401).json({
            errors: errors.array()
        })
    }
} 

module.exports = {
    createCategory
}