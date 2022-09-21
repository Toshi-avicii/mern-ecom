const express = require('express');
const router = express.Router();
const { registerValidations } = require('../../validations/userValidations');
const { register } = require('../../controllers/users/userControllers');

router.post("/register", registerValidations, register);

module.exports = router;