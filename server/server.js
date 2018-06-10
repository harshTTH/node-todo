const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./modals/Todo');
const {User} = require('./modals/User');

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

app.get('/todo/:id',(req,res)=>{
    const id = req.params.id;
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    },(err)=>{
        res.status(400).send();
    })

})


app.listen(process.env.PORT || 3000,()=>{
    console.log('Server running!');
})

module.exports = {app};