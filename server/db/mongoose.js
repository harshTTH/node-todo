const mongoose = require('mongoose');
const uri = `mongodb://TTH:9301461020h@ds231245.mlab.com:31245/node-todo-db`;

mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.export = {
    mongoose
};