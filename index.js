var mg = require('mongoose');
mg.connect('mongodb://huynhnhon:huynhnhon198@ds019472.mlab.com:19472/learn_nodejs');

var db = mg.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected");

    var usersSchema = mg.Schema({
        name: String,
        age: Number,
        date: {
            type: Date,
            default: Date.now
        }
    });

    var users = mg.model('users', usersSchema);

    users.find({ }, { name: 1, _id:0, age:1} ).exec(function(err,Result){
        var NameArray = Result;
        console.log(NameArray);
      })

    // var newUsers = new users({
    //     name: 'Hoai',
    //     age: 20
    // });

    // newUsers.save((err, doc)=> {
    //     console.log(doc.name)
    // });

});