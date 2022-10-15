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

async function getCategories(req, res) {
    const { page } = req.params;
    const perPage = 2;
    const skip = (page - 1) * perPage;
    try {
        const count = await categoryModel.find({}).countDocuments();
        const response = await categoryModel.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 });

        console.log(response);
        res.status(200).json({
         categories: response,
         perPage,
         count   
        });


    } catch(err) {
        res.status(401).json({
            msg: err.message
        })
    }
}

module.exports = {
    createCategory,
    getCategories
}