const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Courses = require('./Routes/Courses')
const Welcome = require ('./Routes/Welcome')
const Search = require('./Routes/Search')
const currency = require('./Routes/countryCurrency');
const bodyParser = require('body-parser');
const Instructor = require('./Routes/Instructor')


//App variables
const app = express();

const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI  ;

app.use(express.json())
// configurations
// Mongo DB
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

//all courses page
app.use('/courses',Courses)

//Home page
app.use('/',Welcome)
app.use('/Search',Search)

app.use('/CurrencyChange',currency)
app.use('/Instructor',Instructor)






