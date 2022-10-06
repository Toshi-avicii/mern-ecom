const express = require('express');
const { createCategory } = require('../controllers/categoryController');
const categoryValidations = require('../validations/categoryValidations');
const categoryRouter = express.Router();

categoryRouter.post('/create-category', categoryValidations, createCategory);

module.exports = categoryRouter;