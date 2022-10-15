const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  
    }
}, {timestamps: true});

const categoryModel = mongoose.model('Categorie', categorySchema);

module.exports = categoryModel;