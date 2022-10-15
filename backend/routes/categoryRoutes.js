const express = require('express');
const { createCategory, getCategories } = require('../controllers/categoryController');
const categoryValidations = require('../validations/categoryValidations');
const categoryRouter = express.Router();
const Authorization = require('../services/Authourization');

categoryRouter.post('/create-category', [categoryValidations, Authorization.authorized], createCategory);
categoryRouter.get("/:page", Authorization.authorized, getCategories);

module.exports = categoryRouter;