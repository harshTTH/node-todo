const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./modals/Todo');
const {Users} = require('./modals/Users');

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    const todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
})

app.get('/todos',(req,res)=>{
    Todo.find({}).then((docs)=>{
        res.send({todos:docs});
    },(err)=>{
        res.status(400).send(err);
    })
})


app.listen(process.env.PORT || 3000,()=>{
    console.log('Server running!');
})

module.exports = {app};