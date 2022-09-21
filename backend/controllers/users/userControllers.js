const { validationResult } = require('express-validator');

const register = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log(errors.array());
    } else {
        console.log(req.body);
    }
}

module.exports = {
    register
}