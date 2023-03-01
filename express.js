const express = require("express")
var bodyParser = require('body-parser');

var cors = require("cors")

const data = require("./data.json")
const app = express();

app.use(cors());

require("dotenv").config()

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

const port = process.env.PORT || 5000


app.listen(port, () => {


    app.get('/', function (req, res) {

        res.send(data)
    });



})