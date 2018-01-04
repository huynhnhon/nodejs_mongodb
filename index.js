var mg = require('mongoose');
var bodyParser = require('body-parser')
var express = require('express');
var multer = require('multer');

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

    var productSchema = mg.Schema({
        product_code: String,
        product_name: String,
        unit: String,
        category: String,
        quantity_in_stock: Number,
        price_each: Number,
        link_image: String,
        date: Date
    });

    var products = mg.model('users', productSchema);

    io.on('connection', function (socket) {
        socket.on('send-suggest', function () {
            products.find({}, {
                category: 1,
                product_code: 1,
                product_name: 1,
                unit: 1,
                _id: 0
            }).exec(function (err, Result) {
                var danhsach = Result;
                socket.emit('list-suggest', danhsach)
            })
        })
    })

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/image")
        },
        filename: function (req, file, cb) {
            var name = req.body.name;
            var code = req.body.code;
            name = name.toLowerCase();
            name = name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            name = name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            name = name.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            name = name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            name = name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            name = name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            name = name.replace(/đ/g, "d");
            name = name.replace(/ + /g," ");
            name = name.replace(/ /g,"-");
            name = name.trim(); 
            cb(null, name + "-" + code + ".jpg")
        }
    })

    var upload = multer({
        storage: storage
    })

    app.post("/add", upload.single("upload"), urlencodedParser, function (req, res) {
        var code = req.body.code;
        var name = req.body.name;
        var quantity = req.body.quantity;
        var price = req.body.price;
        var unit = req.body.unit;
        var cate = req.body.cate;
        var image = req.body.image;
        if (!image || image == "") {
            image = "image/" + req.file.filename;
        } else {
            image = image
        }
        price = price.replace(/,/g, "");
        var newProduct = new products({
            product_code: code.toUpperCase(),
            product_name: name.toUpperCase(),
            unit: unit.toUpperCase(),
            category: cate.toUpperCase(),
            quantity_in_stock: quantity,
            price_each: price,
            link_image: image,
            date: Date.now()
        });

        newProduct.save(function (err, doc) {
            if (err) throw err;
            res.redirect("/add")
        });

    });
    app.get("/", (req, res) => {
        products.find({}, {
            _id: 1,
            product_code: 1,
            product_name: 1,
            unit: 1,
            category: 1,
            quantity_in_stock: 1,
            price_each: 1,
            link_image: 1,
            date: 1
        }).exec(function (err, Result) {
            var list = Result;
            res.render("home.ejs", {
                array: list
            });
        })
    })

    app.get("/add", (req, res) => {
        res.render('add');
        // res.redirect(req.get('/'))
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