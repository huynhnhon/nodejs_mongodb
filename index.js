var mg = require('mongoose');
var bodyParser = require('body-parser')
var express = require('express');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views")

var server = require("http").Server(app);
var io = require('socket.io')(server)
server.listen(1998)

mg.connect('mongodb://huynhnhon:huynhnhon198@ds019472.mlab.com:19472/learn_nodejs');
var db = mg.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected");

    var usersSchema = mg.Schema({

        name: String,
        age: Number,
        image: String,
        date: Date
    });

    var users = mg.model('users', usersSchema);

    var danhsach;

    io.on('connection', function (socket) {
        socket.on('send-list', function(){
            users.find({}, {
                name: 1,
                _id: 1,
                age: 1,
                image: 1,
                date: 1
            }).exec(function (err, Result) {
                danhsach = Result;
                socket.emit('list', danhsach)
            })
            
        })
    })

    app.post("/add", urlencodedParser, (req, res) => {
        var n = req.body.name;
        var a = req.body.age;
        var i = req.body.image;

        var newUsers = new users({
            name: n,
            age: a,
            image: i,
            date: Date.now()
        });

        newUsers.save(function (err, doc) {
            if (err) throw err;
            res.redirect("/add")
        });

    });
    app.get("/", (req, res) => {
        users.find({}, {
            name: 1,
            _id: 1,
            age: 1,
            image: 1,
            date: 1
        }).exec(function (err, Result) {
            var list = Result;
            res.render("home.ejs", {
                array: list
            });
        })
    })

    app.get("/add", (req, res) => {        
        res.render('add')
    })
    // var newUsers = new users({
    //     name: 'Hoai',
    //     age: 20
    // });

    // newUsers.save((err, doc)=> {
    //     console.log(doc.name)
    // });
});
// proxy_pass http://localhost:1998;
// proxy_http_version 1.1;
// proxy_set_header Upgrade $http_upgrade;
// proxy_set_header Connection 'upgrade';
// proxy_set_header Host $host;
// proxy_cache_bypass $http_upgrade;