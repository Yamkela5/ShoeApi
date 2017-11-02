var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoes";

mongoose.connect(mongoURL, {
    useMongoClient: true
}, function(error) {

});

module.exports = function() {
    var ShoeModel = mongoose.Schema({
        color: String,
        brand: String,
        price: Number,
        size: Number,
        in_stock: Number
    })

    var Model = mongoose.model("shoeApi", ShoeModel)

    return {
        Model
    }
}
