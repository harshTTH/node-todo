const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to mongodb server!');
    }
    console.log('Connected to mongodb server');

   db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
   }, (err)=>{
       console.log('Unable to fetch data',err);
   })
    //db.close();
})
