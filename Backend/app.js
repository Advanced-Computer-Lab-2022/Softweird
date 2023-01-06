const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const Courses = require('./Routes/Courses')
const Welcome = require ('./Routes/Welcome')
const Search = require('./Routes/Search')
const currency = require('./Routes/countryCurrency');
const bodyParser = require('body-parser');
const Instructor = require('./Routes/Instructor')
const AdminAdd = require ('./Routes/AdminAdd')
const CorporateTrainee = require ('./Routes/CorporateTrainee')
const IndividualTrainee = require ('./Routes/IndividualTrainee')
const Admin = require('./Routes/Admin');
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const { getVideoDurationInSeconds } = require('get-video-duration');
const VideoLength = require('video-length');
const Sign= require('./Routes/Sign');
const axios =require('axios')
//App variables
const app = express();
var cors = require('cors');

const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI  ;
let transporter =nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth:{
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
   tls: {
    rejectUnauthorized: false

}
}
)

// app.get ('/send',(req,res)=>{
//   var length=0
// getVideoDurationInSeconds("https://www.youtube.com/watch?v=10QKMw90ib0").then((duration) => {
//         console.log(duration)
// }) .catch(e => {
//   res.status(404).send(e)
// })
// VideoLength("https://youtu.be/5wFyZJ8yH9Q", { bin: './bin/MediaInfo.exe' })
// .then(len => {
//    console.log(len)
// })
// .catch(err => {
//    console.log(err);
// })

  

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
// configurations
// Mongo DB

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
app.use('/Search',Search)
app.use('/',Welcome)
app.use('/CurrencyChange',currency)
app.use('/Instructor',Instructor)
app.use('/Individual',IndividualTrainee)
app.use('/Corporate',CorporateTrainee)
app.use('/adminAdd',AdminAdd)
app.use('/sign',Sign)

app.use('/Admin',Admin)
app.get('/get' , async (req,res) => {
  var url2 = 'https://www.youtube.com/watch?v=V8qIqJxCioo'
  var videoID = url2.split("v=")[1].split("&")[0]
  console.log(videoID);
  var key = 'AIzaSyD3vhWTB_cuxFuzlhneouG10jGj_WgoeuU'
  var url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=contentDetails&key=${key}`
  const response = await axios.get(url)
  var d = response.data.items[0].contentDetails.duration
  var match = d.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
        return x.replace(/\D/, '');
    }
  });

  var hours = (parseInt(match[0]) || 0);
  var minutes = (parseInt(match[1]) || 0);
  var seconds = (parseInt(match[2]) || 0);

  var s =  hours * 3600 + minutes * 60 + seconds;
  var m = hours * 60 + minutes + seconds/60
  var t = hours+m+s
 } )



