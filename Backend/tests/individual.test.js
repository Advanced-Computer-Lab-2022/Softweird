const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../App");

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(MongoURI)
  });

 /* Closing database connection after each test. */
 afterEach(async  () => {
  await mongoose.connection.close();

});   

describe("GET profile/:id", () => {
    test("Get profile by Id", (done) => {
      request(app)
        .get("/Individual/getProfile/638fa355d34f3309757fde8e")
        .expect(200)
        .expect((res) => {
            {
                {
                    res.body._id= "638fa355d34f3309757fde90",
                    res.body.user= {
                        "_id": "638fa355d34f3309757fde8e",
                        "fName": "Aly",
                        "lName": "Aly",
                        "gender": "Male",
                        "username": "Aly",
                        "email": "Aly@gmail.com",
                        "password": "$2b$10$FK9QmwvsO/jxMLfEZCQPCe5eDZn06AMHV2En9hFS4HBqszivuYyoW",
                        "type": "individual",
                        "__v": 0
                    },
                    res.body.courseInfo= [
                        {
                            "refund": {
                                "set": false
                            },
                            "percentage": {
                                "progress": 4.2,
                                "total": 15.4,
                                "exer": 0.7000000000000001
                            },
                            "course": "63850bb178ae97605db827cb",
                            "pricePayed": {
                                "$numberDecimal": "100"
                            },
                            "rating": false,
                            "rateInst": false,
                            "certificate": "",
                            "registeredAt": "2023-01-05T03:18:33.615Z",
                            "firstOpen": false,
                            "subtitlesTotal": [
                                {
                                    "exercises": 1,
                                    "videos": 2,
                                    "_id": "63b6418968f7882c13419cd1"
                                },
                                {
                                    "exercises": 1,
                                    "videos": 1,
                                    "_id": "63b6418968f7882c13419cd2"
                                }
                            ],
                            "_id": "63b6418968f7882c13419cd0"
                        }
                    ],
                    res.body.exercises= [],
                    res.body.notes= [],
                    res.body.__v= 0,
                    res.body.videoWatched= [
                        {
                            "course": "Computer Architecture",
                            "subtitlesWatched": [
                                {
                                    "title": "Ay haga",
                                    "video": [
                                        "Inside your computer - Bettina Bair"
                                    ],
                                    "_id": "63b644ea119371efb13641e4"
                                }
                            ],
                            "_id": "63b644ea119371efb13641e3"
                        }
                    ],
                    res.body.wallet= 230
                }
    
    }})
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET profile/:id", () => {
    test("Get profile by Id", (done) => {
      request(app)
        .get("/Individual/getProfile/invalidid")
        .expect(404)
        .expect((res) => {
            {
                res.body=error
    
    }})
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

describe("PATCH change password/:id", () => {
  test("Change password", (done) => {
    request(app)
      .patch("Individual/updateMyPass/638fa355d34f3309757fde8e")
      .send({
          "password" :"Aly"
  })
      .expect(200)
      .expect((res) => { {
        res.body._id= "638fa355d34f3309757fde8e",
        res.body.fName= "Aly",
        res.body.lName= "Aly",
        res.body.gender= "Male",
        res.body.username= "Aly",
        res.body.email= "Aly@gmail.com",
        res.body.password= "$2b$10$FK9QmwvsO/jxMLfEZCQPCe5eDZn06AMHV2En9hFS4HBqszivuYyoW",
        res.body.type= "individual",
        res.body.__v= 0
    }
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("PATCH change password/:id", () => {
    test("Change password", (done) => {
      request(app)
        .patch("Individual/updateMyPass/invalidid")
        .send({
            "password" :"Aly"
    })
        .expect(404)
        .expect((res) => { 
            res.body.error= "invalid id"
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
          
describe("Login", () => {
    test("Login", (done) => {
      request(app)
        .post("sign/login")
        .send({
            Email : "Aly@gmail.com",
            Password : "Aly123!"
        }).expect(200)
        .expect((res) => {
          res.body = "Username or Password is incorrect";
         
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
});


describe("Register for a course", () => {
    test("Register Course", (done) => {
      request(app)
        .patch("registerCourse/638fa355d34f3309757fde8e")
        .send({
            courseTitle : "Computer Architecture"
        }).expect(200)
        .expect((res) => {
          res.body.user = "638fa355d34f3309757fde8e";
         
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
});

describe("Register for a course with wrong title", () => {
    test("Register Course", (done) => {
      request(app)
        .patch("registerCourse/638fa355d34f3309757fde8e")
        .send({
            courseTitle : "Computer Architectuureurere"
        }).expect(404)
        .expect((res) => {
          res.body.error = "no such course";
         
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
});

describe("PATCH review instructor", () => {
    test("review an instructor", (done) => {
      request(app)
        .patch("/Individual/reviewInst/638fa355d34f3309757fde8e")
        .send({
            "instructor":"6384c29e9bed14d581bf6292",
            "username": "Aly",
            "review" :"kont hala2i dah ezzay"
    })
        .expect(200)
        .expect((res) => 
          {
            {{
                res.body.rating= {
                    "rate": {
                        "$numberDecimal": "3.9"
                    },
                    "numberPeople": 10
                },
                res.body._id= "6384c29e9bed14d581bf6294",
                res.body.user= "6384c29e9bed14d581bf6292",
                res.body.biography= "Hello. This is Hala OR NOT!!!",
                res.body.amountOwed= {
                    "$numberDecimal": "1492.5"
                },
                res.body.reviews= [
                    {
                        "traineeId": "63b689ebf79b01670e5e1854",
                        "review": "kont hala2i dah ezzay asasan ya mo2meneen",
                        "date": "2023-01-05T09:03:14.694Z",
                        "_id": "63b69252f79b01670e5e1e53"
                    },
                    {
                        "trainee": "Aly",
                        "traineeId": "638fa355d34f3309757fde8e",
                        "review": "kont hala2i dah ezzay",
                        "date": "2023-01-06T18:20:11.398Z",
                        "_id": "63b8665b5143994f6124be77"
                    }
                ],
                res.body.__v= 0,
                res.body.verify= true,
                res.body.wallet= [
                    {
                        "year": "2023",
                        "months": [
                            {
                                "month": "1",
                                "amounts": [
                                    {
                                        "course": "Computer Architecture",
                                        "moneyPaid": [
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "70"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "20"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "100"
                                                },
                                                "totalStudents": 1,
                                                "_id": "63b487d3499ab7a57ca0639d"
                                            },
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "0"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "0"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "75"
                                                },
                                                "totalStudents": 1,
                                                "_id": "63b68d3df79b01670e5e1920"
                                            }
                                        ],
                                        "totalRefunds": 0,
                                        "totalRefundStudents": 0,
                                        "total": 175,
                                        "totalStudents": 2,
                                        "_id": "63b487d3499ab7a57ca0639c"
                                    },
                                    {
                                        "course": "Math2",
                                        "moneyPaid": [
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "70"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "20"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "100"
                                                },
                                                "totalStudents": 3,
                                                "_id": "63b487f35910f21f4d6c5be3"
                                            },
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "10"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "20"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "100"
                                                },
                                                "totalStudents": 1,
                                                "_id": "63b4984136178f0f843b0a1c"
                                            },
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "10"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "0"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "100"
                                                },
                                                "totalStudents": 1,
                                                "_id": "63b4995dc84e68f5240353f7"
                                            },
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "0"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "70"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "22.5"
                                                },
                                                "totalStudents": 3,
                                                "_id": "63b5f643fdcf24007e8e809c"
                                            }
                                        ],
                                        "totalRefunds": 422.5,
                                        "totalRefundStudents": 5,
                                        "total": 567.5,
                                        "totalStudents": 8,
                                        "_id": "63b487f35910f21f4d6c5be2"
                                    },
                                    {
                                        "course": "Math3",
                                        "moneyPaid": [],
                                        "totalRefunds": 100,
                                        "totalRefundStudents": 1,
                                        "total": 0,
                                        "totalStudents": 0,
                                        "_id": "63b5d8c78019b95e6499994a"
                                    },
                                    {
                                        "course": "Computer Graphics",
                                        "moneyPaid": [
                                            {
                                                "promotionAdded": {
                                                    "admin": {
                                                        "$numberDecimal": "0"
                                                    },
                                                    "inst": {
                                                        "$numberDecimal": "0"
                                                    }
                                                },
                                                "money": {
                                                    "$numberDecimal": "75"
                                                },
                                                "totalStudents": 1,
                                                "_id": "63b68ed6f79b01670e5e1bd2"
                                            }
                                        ],
                                        "totalRefunds": 75,
                                        "totalRefundStudents": 1,
                                        "total": 75,
                                        "totalStudents": 1,
                                        "_id": "63b68ed6f79b01670e5e1bd1"
                                    }
                                ],
                                "_id": "63b487d3499ab7a57ca0639b"
                            }
                        ],
                        "_id": "63b487d3499ab7a57ca0639a"
                    }
                ],
                res.body.updatedAt= "2023-01-05T01:40:24.416+00:00",
                res.body.createdAt= "2022-11-28T19:27:45.666+00:00"
            }
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


  describe("PATCH review instructor", () => {
    test("review an instructor", (done) => {
      request(app)
      .patch("/Individual/reviewInst/638fa355d34f3309757fde8e")
      .send({
          "instructor":"6384c29e9bed14d581bf6292",
          "username": "Aly",
          "review" :"kont hala2i dah ezzay"
  })
        .expect(404)
        .expect((res) => 
          {
           res.body.error="error"
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });