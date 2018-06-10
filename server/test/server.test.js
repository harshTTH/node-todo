const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../modals/Todo');
const {ObjectID} = require('mongodb');

const todos = [
    {
        _id:new ObjectID(),
        text:'go home',
    },
    {
        text:'go school',
        _id:new ObjectID()
    },
    {
        text:'come home',
        _id:new ObjectID()
    },
];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = "too test text";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=>done(err));
        })
    });

    it('should not create a new todo with invalid body',(done)=>{
        request(app)
        .post('/todos')
        .send({text:""})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(3);
                done();
            }).catch((err)=>done(err));
        })
    });
})

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    })
})

describe('GET /todo/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todo/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })
    it('should return 404 if todo not found',(done)=>{
        const id = '5b1d655947df268ae7e9c5df';
        request(app)
        .get(`/todo/${id}`)
        .expect(404)
        .end(done)
    })
    it('should return 400 if todo id not valid',(done)=>{
        request(app)
        .get('/todo/123')
        .expect(400)
        .end(done)
    })
})

