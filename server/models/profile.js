const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login:{
        type : String,
        require: true,
        unique: true
    },
    name: {
        type : String,
        require: true
    },
    age: {
        type : String,
        require: true
    },
    country: {
        type : String,
        require: true
    },
    city: {
        type : String,
        require: true
    }
    
})

schema.set('toJSON',{virtuals: true})

module.exports = mongoose.model('profile', schema);