const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../App");

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(MongoURI)
  });

 /* Closing database connection after each test. */
 afterEach(async  () => {
  await mongoose.connection.close();

});   

describe("GET logout", () => {
    test("logout", (done) => {
      request(app)
        .get("sign/logout")
        .expect(200)
        .expect((res) => {
            [
                res.body= "Logout Successfull"
            ]
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


  describe("POST new user", () => {
    test("register", (done) => {
      request(app)
        .post("/sign/signUp")
        .send({
            FirstName : "You",
            LastName : "You2",
            Gender : "Female",
            Username : "You",
            Email : "You@gmail.com",
            Password : "You123!"
        }).expect(201)
        .expect((res) => {
            {
             res.body="Sign up Successful " 
            }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

          
  describe("POST new user", () => {
    test("register with same mail", (done) => {
      request(app)
        .post("/sign/signUp")
        .send({
            FirstName : "You3",
            LastName : "You3",
            Gender : "Male",
            Username : "You",
            Email : "You@gmail.com",
            Password : "You123!"
        }).expect(200)
        .expect((res) => {
            {
             res.body="This email is already signed in" 
            }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET search", () => {
    test("search", (done) => {
      request(app)
        .get("/Search?id=63a3461cba8af3406d7e8aae&type=corporate&input=math2")
        .expect(200)
        .expect((res) => {
            [
                {
                    "promotionInst": {
                        "set": true,
                        "value": {
                            "$numberDecimal": "70"
                        }
                    },
                    "promotionAdmin": {
                        "set": true,
                        "value": {
                            "$numberDecimal": "5"
                        }
                    },
                    "Deleted": false,
                    "_id": "63850bc978ae97605db827cf",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Math2",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 10.2,
                    "subject": "Mathematics",
                    "price": "100",
                    "summary": "This Specialization is for learners interested in exploring or pursuing careers in data science or understanding some data science for their current roles. This course will build upon your previous mathematical foundations and equip you with key applied tools for using and analyzing large data sets. ",
                    "enrolledStudents": 0,
                    "Finished": true,
                    "subtitles": [
                        {
                            "title": "Integration",
                            "totalHours": 0,
                            "_id": "63af707285f41cb782aa077f",
                            "video": [],
                            "exercise": []
                        }
                    ],
                    "reviews": [],
                    "createdAt": "2022-11-28T19:28:09.319Z",
                    "updatedAt": "2023-01-05T01:23:33.845Z",
                    "__v": 0
                }
            ]
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

