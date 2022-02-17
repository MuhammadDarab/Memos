const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const credinals = require('./models/credinalsSchema')

const DB = 'mongodb+srv://Mongo2099:futureman2099@cluster0.inxix.mongodb.net/Memos?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(() => console.log('Connection To MemosDB successfull!'))
.catch((err) => console.log('Error Occured!' + err))

const email = 'darabmonib123@gmail.com';
const password = 'paradox123';

const app = express();
let PORT = 8080;

app.use(cors())
app.use(bodyParser.json())

app.post('/credinals', (req, res) => {

    console.log(req.body);
    if(req.body.email && req.body.password){
        res.send(200)
        let data = new credinals({
            email:req.body.email, 
            password:req.body.password
        })
        data.save();
    }
    else
    res.send(301);
})

app.listen(PORT, () => {console.log(`Listening on ${PORT}`)})

