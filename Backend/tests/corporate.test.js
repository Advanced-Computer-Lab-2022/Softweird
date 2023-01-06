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
        .get("/Corporate/getMyProfile/63a3461cba8af3406d7e8aae")
        .expect(200)
        .expect((res) => {
            {
                {
                    res.body._id= "63a3461cba8af3406d7e8ab0",
                    company= {
                        "_id":"63850c6378ae97605db827d5",
                        "name": "GUC",
                        "courses": [
                            {
                                "course": "63850bc978ae97605db827cf",
                                "expiryDate": "2022-12-12T00:00:00.000Z",
                                "level": 6,
                                "_id": "63850cbb78ae97605db827d8"
                            },
                            {
                                "_id": "63b85b5e3ac3d87f8c085c82",
                                "course": "63850bb178ae97605db827cb",
                                "expiryDate": "2023-12-12T00:00:00.000Z",
                                "level": 1
                            }
                        ],
                        "__v": 0
                    },
                    res.body.user= {
                        "_id": "63a3461cba8af3406d7e8aae",
                        "fName": "Haywan",
                        "lName": "Bdeel",
                        "gender": "Female",
                        "username": "Taweel",
                        "email": "hala19medhat@gmail.com",
                        "password": "$2b$10$qbLG1OhUjgHGoHcUCUIsLu9TicRZSuBVwdQK4I9ujhiIXeMr181D6",
                        "type": "corporate",
                        "__v": 0
                    },
                    res.body.courseInfo= [
                        {
                            "percentage": {
                                "progress": 15.4,
                                "total": 15.4,
                                "exer": 0.7000000000000001
                            },
                            "course": "63850bb178ae97605db827cb",
                            "rating": false,
                            "rateInst": false,
                            "certificate": "true",
                            "firstOpen": false,
                            "subtitlesTotal": [
                                {
                                    "exercises": 1,
                                    "videos": 2,
                                    "_id": "63b69bd6f79b01670e5e27ec"
                                },
                                {
                                    "exercises": 1,
                                    "videos": 1,
                                    "_id": "63b69bd6f79b01670e5e27ed"
                                }
                            ],
                            "_id": "63b69bd6f79b01670e5e27eb",
                            "certDate": "2023-01-05T09:44:41.789Z"
                        },
                        {
                            "percentage": {
                                "progress": 0,
                                "total": 15.4,
                                "exer": 0.7000000000000001
                            },
                            "course": "63850bb178ae97605db827cb",
                            "rating": false,
                            "rateInst": false,
                            "certificate": "",
                            "firstOpen": true,
                            "subtitlesTotal": [
                                {
                                    "exercises": 1,
                                    "videos": 2,
                                    "_id": "63b7f874bd496ca2ee45c7de"
                                },
                                {
                                    "exercises": 1,
                                    "videos": 1,
                                    "_id": "63b7f874bd496ca2ee45c7df"
                                }
                            ],
                            "_id": "63b7f874bd496ca2ee45c7dd"
                        }
                    ],
                    res.body.videoWatched= [
                        {
                            "course": "Computer Architecture",
                            "subtitlesWatched": [
                                {
                                    "title": "Ay haga",
                                    "video": [
                                        "Inside your computer - Bettina Bair",
                                        "How computer memory works - Kanawat Senanan"
                                    ],
                                    "_id": "63b69be2f79b01670e5e283d"
                                },
                                {
                                    "title": "leh",
                                    "video": [
                                        "How exactly does binary code work? "
                                    ],
                                    "_id": "63b69c01f79b01670e5e28b4"
                                }
                            ],
                            "_id": "63b69be2f79b01670e5e283c"
                        }
                    ],
                    res.body.exercises= [
                        {
                            "course": "63850bb178ae97605db827cb",
                            "subtitle": "Ay haga",
                            "answers": [
                                "a",
                                "b"
                            ],
                            "grade": 50,
                            "_id": "63b69becf79b01670e5e2861"
                        },
                        {
                            "course": "63850bb178ae97605db827cb",
                            "subtitle": "leh",
                            "answers": [
                                "a"
                            ],
                            "grade": 100,
                            "_id": "63b69bf8f79b01670e5e2884"
                        }
                    ],
                    res.body.notes= [],
                    res.body.accessRequests= [
                        {
                            "course": "63861166b09a3cf8f51514b0",
                            "state": "pending",
                            "_id": "63b69b4cf79b01670e5e2720"
                        }
                    ],
                    res.body.level= 2
                }            }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET profile/:id", () => {
    test("Get profile by Id", (done) => {
      request(app)
        .get("/Corporate/getMyProfile/invalidid")
        .expect(200)
        .expect((res) => {
            {
                res.body= error
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
      .patch("Corporate/updateMyPass/63a3461cba8af3406d7e8aae")
      .send({
          "password" :"Hala123!"
  })
      .expect(200)
      .expect((res) => { {
        res.body._id= "63a3461cba8af3406d7e8aae",
        res.body.fName= "Haywan",
        res.body.lName= "Bdeel",
        res.body.gender= "Female",
        res.body.username= "Taweel",
        res.body.email= "hala19medhat@gmail.com",
        res.body.password= "$2b$10$Kr0UoabEjux/GHnZSh0LgeQ7HvIHAqMqKC1SS9.ODKln5hBXOZe9S",
        res.body.type= "corporate",
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
        .patch("Corporate/updateMyPass/invalidid")
        .send({
            "password" :"Hala123!"
    })
        .expect(404)
        .expect((res) => { {
          res.body.error= "invalid id"
      }
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
            Email : "ranaelnahas@gmail.com",
            Password : "Rana123!"
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
        .patch("registerCourse/63a3461cba8af3406d7e8aae")
        .send({
            courseTitle : "Computer Architecture"
        }).expect(200)
        .expect((res) => {
          res.body.user = "63a3461cba8af3406d7e8aae";
         
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
        .patch("registerCourse/63a3461cba8af3406d7e8aae")
        .send({
            courseTitle : "Computer Architectureererere"
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
        .patch("/Corporate/reviewInst/63a3461cba8af3406d7e8aae")
        .send({
            "instructor":"6384c29e9bed14d581bf6292",
            "username": "Taweel",
            "review" :"dah ezzay"
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
                    },
                    {
                        "trainee": "Taweel",
                        "traineeId": "63a3461cba8af3406d7e8aae",
                        "review": "dah ezzay",
                        "date": "2023-01-06T18:22:16.518Z",
                        "_id": "63b866d8c47b263849c7878c"
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
        .patch("/Corporate/reviewInst/63a3461cba8af3406d7e8aae")
        .send({
            "instructor":"wrong id",
            "username": "Taweel",
            "review" :"dah ezzay"
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
