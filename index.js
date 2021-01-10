const express = require('express');
const app= express();
const mongoose =  require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./routes/routes');
const cors = require('cors');



dotenv.config();
var port = process.env.PORT || 4000;
//const db = require('./keys').MongoURI;

//mongoose.connect(db,{ useNewUrlParser:true}, () => console.log("Database Connected"));
mongoose.connect(process.env.DATABASE_ACCESS,{ useNewUrlParser:true}, () => console.log("Database Connected"));

app.use(express.json());
app.use(cors());
app.use(routeUrls);


app.listen(port,() => console.log("server is up and running"));