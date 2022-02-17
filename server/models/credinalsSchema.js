const mongoose = require('mongoose');

const credinalsSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const credinals = mongoose.model('CREDINALS', credinalsSchema);

module.exports = credinals