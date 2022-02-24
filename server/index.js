const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const credinals = require('./models/credinalsSchema');
const signup = require('./models/signupSchema');
const memos = require('./models/memosSchema');

const DB = 'mongodb+srv://Mongo2099:futureman2099@cluster0.inxix.mongodb.net/Memos?retryWrites=true&w=majority'
let parsed = '';


mongoose.connect(DB)
.then(() => console.log('Connection To MemosDB successfull!'))
.catch((err) => console.log('Error Occured!' + err))

const app = express();
let HOST = 'ENVIP';
let PORT =  process.env.PORT || 8080;


app.use(cors())
app.use(bodyParser.json({limit: '200mb'}))

app.post('/login', (req, res) => {

    if(req.body.email && req.body.password){
        credinals.find({ email: req.body.email })
        .then(result => {
            if(result[0]){

                parsed = JSON.parse(JSON.stringify(result[0]))
                console.log(parsed.name);

                if(result[0].password === req.body.password){
                    // res.send(200)
                    res.send({ display: parsed.name })
                    //Email / Pass matches
                }
                else
                    res.sendStatus(401)
                    //Email / Pass does'nt match.
            }
            else
                res.sendStatus(404)
                //No record found.
        })

    }
    else
    res.sendStatus(500);
})

app.post('/signup', (req, res) => {

    console.log(req.body);
    if(req.body.name && req.body.email && req.body.password){
        
        let newUser = new signup({

            name:req.body.name,
            email:req.body.email,
            password:req.body.password

        })

        newUser.save().then(() => {
            res.sendStatus(200)
        });

    }    
    
})

app.get('/home', (req, res) => {

    res.send({ display: parsed.name });  

})

app.get('/test', (req, res) => {

    res.send('Greetings!')

})

app.post('/submit', (req, res) => {

    let currentdate = new Date(); 
    let datetime =  "Published At: "+ currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ", " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear()  

    if(req.body.picture64 && req.body.author && req.body.desc){
        console.log('Successfully got The Request, Sending it to DATABASE!')
        let newMemo = new memos({

            picture64:req.body.picture64,
            author:req.body.author,
            desc:req.body.desc,
            createdAt: datetime

        })

        newMemo.save().then(() => {
            res.sendStatus(200)
        });

    }    

})

app.get('/memos', (req, res) => {

    memos.find().then((data) => {

        res.send(data);

    })

})

app.delete('/memos/:id', (req, res) => {

    memos.findOneAndRemove({ _id: req.params.id }).then(() => {
        console.log(`Telling MongoDB to delete ${req.params.id}`)
    });

})

app.patch('/memos/:id', async (req, res) => {

    console.log(req.body.toChange)
    console.log(req.body.toBeChanged)

   await memos.findOneAndUpdate({ desc: req.body.toBeChanged },{ desc: req.body.toChange })
   console.log("changes Made");

})


app.listen(PORT, () => {console.log(`${HOST}:${PORT}`)})

