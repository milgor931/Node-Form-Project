var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
//translate data into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Node_Form");

//Local connection
//"mongodb://localhost:27017/Node_Form"
//mongodb+srv://milgor931:mmoinlgaondab@cluster0-tjrn3.mongodb.net/test?retryWrites=true&w=majority
var nameSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    phone : String,
    email : String,
    notes : String
});

var User = mongoose.model("Contacts", nameSchema);


app.post("/contact", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});