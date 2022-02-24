const mongoose = require('mongoose');

const memosSchema = new mongoose.Schema({

    picture64:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }

})

const memos = mongoose.model('MEMOS', memosSchema, 'memos');

module.exports = memos