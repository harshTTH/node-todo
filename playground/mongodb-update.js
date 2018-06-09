const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server!');
    }
    console.log('Connected to mongodb server');

    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5b1bddb4607af12dfb139367')
    },{
        $set:{
          name:'khushia'  
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((res)=>{
        console.log(res);
    })
})
