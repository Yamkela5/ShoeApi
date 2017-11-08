var express = require('express');
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoes";
var Models = require("./db");
var models = Models(mongoURL);
var app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

//set up the engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "handlebars")

// A route that will display all shoes
app.get('/api/shoes', function(req, res) {
    models.Model.find({}, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }
    })

})

// A route that will display routes with different brands
app.get('/api/shoes/brand/:brandname', function(req, res) {
    var brand = req.params.brandname;
    console.log(brand);
    models.Model.find({
        brand: brand
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }
    })

})

// GET route for all shoes sizes
app.get('/api/shoes/size/:size', function(req, res) {
    var Size = req.params.size;
    models.Model.find({
        size: Size
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }
    })
})
// app.get('/api/shoes/color/:color', function(req, res) {
//     var Size = req.params.color;
//     models.Model.find({
//         size: Size
//     }, function(err, results) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(results)
//         }
//     })
// })
// A route that will filter shoes with size and brand
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
    var Brand = req.params.brandname;
    var Size = req.params.size;
    models.Model.find({
        brand: Brand,
        size: Size
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }
    })
})
// A route for sold shoes
app.post('/api/shoes/sold/:id', function(req, res) {
    var id = req.params.id;
    models.Model.findOneAndUpdate({
            _id: id
        },

        {
            $inc: {
                in_stock: -1
            }
        }, {
            upsert: false
        },
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        })
})
// route for adding a new shoe
app.post('/api/shoes', function(req, res) {
    var Color = req.body.color;
    var Brand = req.body.brand;
    var Price = req.body.price;
    var Size = req.body.size;
    var In_stock = req.body.in_stock;
    models.Model.create({
        color: Color,
        brand: Brand,
        price: Price,
        size: Size,
        in_stock: In_stock
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
            console.log(results);
        }



    })

})


port = process.env.PORT || 3000;

app.listen(port);

console.log('Shoe API started on: ' + port);
