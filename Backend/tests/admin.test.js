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
        .get("/Admin/getMyProfile/6384c26d9bed14d581bf628e")
        .expect(200)
        .expect((res) => {
          {
            res.body._id= "6384c26d9bed14d581bf628e",
            res.body.fName= "Mariam",
            res.body.lName= "Tamer",
            res.body.gender= "Female",
            res.body.username= "mariam237",
            res.body.email= "mariamtamer237@gmail.com",
            res.body.password= "$2b$10$RDkhsslEpnOpIMqw5vQSQexufBwwpz4EOa059lf/nS.g./Wpo0yu2",
            res.body.type= "admin",
            res.body.__v= 0
        }
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
        .get("/Admin/getMyProfile/invaidid")
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
      .patch("Admin/updateMyPass/6384c26d9bed14d581bf628e")
      .send({
          "password" :"Mero"
  })
      .expect(200)
      .expect((res) => { {
        res.body._id= "6384c26d9bed14d581bf628e",
        res.body.fName= "Mariam",
        res.body.lName= "Tamer",
        res.body.gender= "Female",
        res.body.username= "mariam237",
        res.body.email= "mariamtamer237@gmail.com",
        res.body.password= "$2b$10$RDkhsslEpnOpIMqw5vQSQexufBwwpz4EOa059lf/nS.g./Wpo0yu2",
        res.body.type= "admin",
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
        .patch("Admin/updateMyPass/invaidid")
        .send({
            "password" :"Mero"
    })
        .expect(200)
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

          
describe("GET reports", () => {
    test("Get reports", (done) => {
      request(app)
        .get("/Admin/getreports")
        .expect(200)
        .expect((res) => {
          {
            {
                res.body.r = [
                    {
                        "_id": "63b68f29f79b01670e5e1cba",
                        "title": "problem",
                        "body": "i have a problem",
                        "type": "Technical",
                        "reporter": {
                            "_id": "63b689ebf79b01670e5e1854",
                            "fName": "Nada",
                            "lName": "Ibrahim",
                            "gender": "Female",
                            "username": "nibrahim",
                            "email": "nada.ibrahim89@gmail.com",
                            "password": "$2b$10$fuDgY1poXS2AqSSP1Mppk.N4YaEDFR1HR3hT1g5ud6IXeaseLVl5y",
                            "type": "individual",
                            "createdAt": "2023-01-05T08:27:23.614Z",
                            "updatedAt": "2023-01-05T09:06:32.510Z",
                            "__v": 0
                        },
                        "adminSeen": [
                            "6384c26d9bed14d581bf628e",
                            "6384c26d9bed14d581bf628e"
                        ],
                        "adminMessageSeen": true,
                        "reporterMessageSeen": false,
                        "solved": "pending",
                        "followUp": [
                            {
                                "from": "individual",
                                "body": "helloooo",
                                "_id": "63b690e1f79b01670e5e1cfd"
                            },
                            {
                                "from": "individual",
                                "body": "helloooo ya 3alam",
                                "_id": "63b690e8f79b01670e5e1d00"
                            },
                            {
                                "from": "individual",
                                "body": "enta ya zeft",
                                "_id": "63b690eff79b01670e5e1d04"
                            },
                            {
                                "from": "admin",
                                "body": "na3am ya zeftein",
                                "_id": "63b694eef79b01670e5e1f2e"
                            }
                        ],
                        "createdAt": "2023-01-05T08:49:45.545Z",
                        "updatedAt": "2023-01-05T09:14:22.412Z",
                        "__v": 0,
                        "adminSolver": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        },
                        "pendingReason": "3eera"
                    }
                ]
            }
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET reports", () => {
    test("Get reports", (done) => {
      request(app)
        .get("/Corporate/getreports")
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

describe("GET refunds", () => {
    test("Get refunds", (done) => {
      request(app)
        .get("/Admin/getRefunds")
        .expect(200)
        .expect((res) => {
          {
            {
                res.body.a= [
                    {
                        "_id": "63b68efaf79b01670e5e1ca9",
                        "Trainee": {
                            "_id": "63b689ebf79b01670e5e1854",
                            "fName": "Nada",
                            "lName": "Ibrahim",
                            "gender": "Female",
                            "username": "nibrahim",
                            "email": "nada.ibrahim89@gmail.com",
                            "password": "$2b$10$fuDgY1poXS2AqSSP1Mppk.N4YaEDFR1HR3hT1g5ud6IXeaseLVl5y",
                            "type": "individual",
                            "createdAt": "2023-01-05T08:27:23.614Z",
                            "updatedAt": "2023-01-05T09:06:32.510Z",
                            "__v": 0
                        },
                        "Course": {
                            "promotionInst": {
                                "set": false,
                                "value": {
                                    "$numberDecimal": "0"
                                }
                            },
                            "promotionAdmin": {
                                "set": false,
                                "value": {
                                    "$numberDecimal": "0"
                                }
                            },
                            "Deleted": false,
                            "_id": "63861166b09a3cf8f51514b0",
                            "instructor_id": "6384c29e9bed14d581bf6292",
                            "title": "Computer Graphics",
                            "rating": {
                                "$numberDecimal": "0"
                            },
                            "numberRating": 0,
                            "totalHours": 5.7,
                            "subject": "Computer Science",
                            "price": "100",
                            "summary": "This Specialization is for learners interested in exploring or pursuing careers in data science or understanding some data science for their current roles. This course will build upon your previous mathematical foundations and equip you with key applied tools for using and analyzing large data sets. ",
                            "enrolledStudents": 1,
                            "Finished": true,
                            "subtitles": [
                                {
                                    "title": "OpenGl Introduction",
                                    "totalHours": 5.7,
                                    "_id": "63b5fe14e1205326254f83c5",
                                    "video": [
                                        {
                                            "link": "https://www.youtube.com/watch?v=Lx8NhRCR0Vk",
                                            "text": "Learn OpenGL 2D shapes",
                                            "length": "5.7",
                                            "preview": true,
                                            "_id": "63b601fae1205326254f8417"
                                        }
                                    ],
                                    "exercise": [
                                        {
                                            "number": "1",
                                            "question": "what is open gl?",
                                            "choices": [
                                                "something not important",
                                                "May be Important",
                                                "It damages laptop",
                                                "too outdated"
                                            ],
                                            "answer": "d",
                                            "_id": "63b5fedce1205326254f83ce"
                                        }
                                    ]
                                }
                            ],
                            "reviews": [],
                            "createdAt": "2022-11-29T14:04:22.078Z",
                            "updatedAt": "2023-01-05T08:48:21.834Z",
                            "__v": 0
                        },
                        "state": "accepted",
                        "reason": "keifi",
                        "createdAt": "2023-01-05T08:48:58.453Z",
                        "updatedAt": "2023-01-05T09:17:54.162Z",
                        "__v": 0,
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        }
                    },
                    {
                        "_id": "63b5fa24a322fec50d85cd48",
                        "Trainee": {
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
                        "Course": {
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
                        },
                        "state": "accepted",
                        "reason": "Less than 50% of the course is completed",
                        "createdAt": "2023-01-04T22:13:56.817Z",
                        "updatedAt": "2023-01-04T22:14:21.761Z",
                        "__v": 0,
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        }
                    },
                    {
                        "_id": "63b5f92f1b9477689b2d0787",
                        "Trainee": {
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
                        "Course": {
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
                        },
                        "state": "accepted",
                        "reason": "Less than 50% of the course is completed",
                        "createdAt": "2023-01-04T22:09:51.643Z",
                        "updatedAt": "2023-01-04T22:11:02.105Z",
                        "__v": 0,
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        }
                    },
                    {
                        "_id": "63b5f3605c97370b1d07f846",
                        "Trainee": {
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
                        "Course": {
                            "promotionInst": {
                                "set": false,
                                "value": {
                                    "$numberDecimal": "0"
                                }
                            },
                            "promotionAdmin": {
                                "set": true,
                                "value": {
                                    "$numberDecimal": "25"
                                }
                            },
                            "Deleted": false,
                            "_id": "63850bb178ae97605db827cb",
                            "instructor_id": "6384c29e9bed14d581bf6292",
                            "title": "Computer Architecture",
                            "rating": {
                                "$numberDecimal": "4"
                            },
                            "numberRating": 1,
                            "totalHours": 14,
                            "subject": "Computer Science",
                            "price": "100",
                            "summary": "This Specialization is for learners interested in exploring or pursuing careers in data science or understanding some data science for their current roles. This course will build upon your previous mathematical foundations and equip you with key applied tools for using and analyzing large data sets. ",
                            "enrolledStudents": 5,
                            "Finished": true,
                            "subtitles": [
                                {
                                    "title": "Ay haga",
                                    "totalHours": 9.3,
                                    "_id": "639d7da878f75181ed819f91",
                                    "video": [
                                        {
                                            "link": "https://www.youtube.com/watch?v=AkFi90lZmXA",
                                            "text": "Inside your computer - Bettina Bair",
                                            "length": "4.2",
                                            "preview": true,
                                            "_id": "63b09a84fe96515f286c30b6"
                                        },
                                        {
                                            "link": "https://www.youtube.com/watch?v=p3q5zWCw8J4",
                                            "text": "How computer memory works - Kanawat Senanan",
                                            "length": "5.1",
                                            "preview": false,
                                            "_id": "63b09aa9fe96515f286c30c5"
                                        }
                                    ],
                                    "exercise": [
                                        {
                                            "number": "1",
                                            "question": "Leh bydary Keda wala hwa dary keda .....?who is singing?",
                                            "choices": [
                                                "Ruby",
                                                "Haifa ;)",
                                                "Elisa",
                                                "Nancy "
                                            ],
                                            "answer": "a",
                                            "_id": "639d87b7002a7f321bf6f74c"
                                        },
                                        {
                                            "number": "2",
                                            "question": "Ana Meen ? , Hal ana ...................",
                                            "choices": [
                                                "Hala",
                                                "am Rana",
                                                "am Mariam",
                                                "wala kolo"
                                            ],
                                            "answer": "d",
                                            "_id": "639d87b7002a7f321bf6f74d"
                                        }
                                    ]
                                },
                                {
                                    "title": "leh",
                                    "totalHours": 4.7,
                                    "_id": "639f6f03a61a97b750f2c1fd",
                                    "video": [
                                        {
                                            "link": "https://www.youtube.com/watch?v=wgbV6DLVezo",
                                            "text": "How exactly does binary code work? ",
                                            "length": "4.7",
                                            "preview": false,
                                            "_id": "63b09acffe96515f286c30d6"
                                        }
                                    ],
                                    "exercise": [
                                        {
                                            "number": "1",
                                            "question": "What is CA?",
                                            "choices": [
                                                "Computer Architecture",
                                                "CISC App",
                                                "Computer Apple",
                                                "Camera Apple"
                                            ],
                                            "answer": "a",
                                            "_id": "63b6413e68f7882c13419c19"
                                        }
                                    ]
                                }
                            ],
                            "reviews": [
                                {
                                    "traineeId": "63b689ebf79b01670e5e1854",
                                    "review": "yow",
                                    "date": "2023-01-05T08:45:46.109Z",
                                    "_id": "63b68e3af79b01670e5e1ae6"
                                }
                            ],
                            "createdAt": "2022-11-28T19:27:45.666Z",
                            "updatedAt": "2023-01-06T10:31:16.916Z",
                            "__v": 0
                        },
                        "state": "rejected",
                        "reason": "More than 50% of the course is completed",
                        "createdAt": "2023-01-04T21:45:04.889Z",
                        "updatedAt": "2023-01-04T21:46:52.002Z",
                        "__v": 0,
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        }
                    },
                    {
                        "_id": "63a8cf72007d76f68a942bf9",
                        "Trainee": {
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
                        "Course": {
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
                        },
                        "state": "rejected",
                        "reason": "More than 50% of the course is completed",
                        "createdAt": "2022-12-25T22:32:18.278Z",
                        "updatedAt": "2022-12-26T20:25:58.055Z",
                        "__v": 0,
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        }
                    },
                    {
                        "_id": "63a228d216e587c31f91b3a0",
                        "Trainee": {
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
                        "Course": {
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
                        },
                        "reason": "Less than 50% of the course is completed",
                        "__v": 0,
                        "state": "accepted",
                        "Admin": {
                            "_id": "6384c26d9bed14d581bf628e",
                            "fName": "Mariam",
                            "lName": "Tamer",
                            "gender": "Female",
                            "username": "mariam237",
                            "email": "mariamtamer237@gmail.com",
                            "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                            "type": "admin",
                            "__v": 0,
                            "updatedAt": "2023-01-06T16:35:41.154Z"
                        },
                        "updatedAt": "2022-12-30T11:19:40.610Z"
                    }
                ],
                res.body.i= [
                    {
                        "wallet": 0,
                        "_id": "63880049d70ba4f78fb20d93",
                        "user": "6387cd0c3420cccd5c92f4c0",
                        "courseInfo": [],
                        "videoWatched": [
                            {
                                "course": "fgh",
                                "subtitlesWatched": [
                                    {
                                        "title": "ggg",
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "6388010cd9f68fd07b38ebcc"
                                    },
                                    {
                                        "title": "fff",
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "638802d0b588eb978cbb2ab9"
                                    },
                                    {
                                        "video": [],
                                        "_id": "638807a668abc5377d3538dc"
                                    },
                                    {
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "638807fa95da8c87387d49c6"
                                    },
                                    {
                                        "title": "R",
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "6388717e95da8c87387d49d4"
                                    },
                                    {
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "6388717e95da8c87387d49dc"
                                    },
                                    {
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "638871df95da8c87387d49f5"
                                    },
                                    {
                                        "title": "t",
                                        "video": [
                                            "gnjj"
                                        ],
                                        "_id": "63887209272d0a93e82645d0"
                                    },
                                    {
                                        "video": [],
                                        "_id": "6388743aa8ecd1e6e601578c"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63887483466010ac4d3b1e20"
                                    },
                                    {
                                        "title": "YT",
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63887498466010ac4d3b1e3a"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63887499466010ac4d3b1e48"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "6388754353ba0714a5ab596a"
                                    },
                                    {
                                        "video": [],
                                        "_id": "63887c96ccbc2f507f1f7539"
                                    },
                                    {
                                        "video": [],
                                        "_id": "63887ca4ccbc2f507f1f7570"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "638880ed53607049f80e6088"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "6388810053607049f80e60cb"
                                    },
                                    {
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63888bd96db65b84b8fba480"
                                    },
                                    {
                                        "video": [
                                            "fffffff"
                                        ],
                                        "_id": "63888beb6db65b84b8fba4c9"
                                    },
                                    {
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888c6e2d07b998df65b621"
                                    },
                                    {
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888c722d07b998df65b676"
                                    },
                                    {
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888d27636405601536860f"
                                    }
                                ],
                                "_id": "6388010cd9f68fd07b38ebcb"
                            },
                            {
                                "course": "ERTYUIO",
                                "subtitlesWatched": [
                                    {
                                        "title": "YT",
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63887504f542562d0792b85a"
                                    }
                                ],
                                "_id": "63887504f542562d0792b859"
                            },
                            {
                                "course": "trewwwwwwwwwwwwww",
                                "subtitlesWatched": [
                                    {
                                        "title": "YT",
                                        "video": [
                                            "n"
                                        ],
                                        "_id": "63887df8909585d2cd8b824d"
                                    }
                                ],
                                "_id": "63887df8909585d2cd8b824c"
                            },
                            {
                                "course": "hygfdsssssssssssssssssssssssssssssssss",
                                "subtitlesWatched": [
                                    {
                                        "title": "YT",
                                        "video": [
                                            "fffffff"
                                        ],
                                        "_id": "63888c5c2d07b998df65b5cf"
                                    },
                                    {
                                        "title": "jjjjjjj",
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888de4636405601536864d"
                                    },
                                    {
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888de4636405601536866d"
                                    },
                                    {
                                        "video": [
                                            "ttttttttttttt"
                                        ],
                                        "_id": "63888f4c63640560153686ce"
                                    },
                                    {
                                        "video": [
                                            "nn"
                                        ],
                                        "_id": "63888f8e6364056015368732"
                                    },
                                    {
                                        "video": [
                                            "pleaseeeeeeeeeee"
                                        ],
                                        "_id": "638f8ea0007d58e3c6c4129f"
                                    }
                                ],
                                "_id": "63888c5c2d07b998df65b5ce"
                            },
                            {
                                "subtitlesWatched": [
                                    {
                                        "video": [
                                            "new"
                                        ],
                                        "_id": "638f8dac3cecb2b4d863fc50"
                                    }
                                ],
                                "_id": "638f8dac3cecb2b4d863fc4f"
                            },
                            {
                                "course": "new",
                                "subtitlesWatched": [
                                    {
                                        "title": "jjjjjjj",
                                        "video": [
                                            "new"
                                        ],
                                        "_id": "638f8db53cecb2b4d863fc78"
                                    }
                                ],
                                "_id": "638f8db53cecb2b4d863fc77"
                            },
                            {
                                "course": "newTany",
                                "subtitlesWatched": [
                                    {
                                        "title": "jjjjjjj",
                                        "video": [
                                            "new"
                                        ],
                                        "_id": "638f8de03cecb2b4d863fca2"
                                    }
                                ],
                                "_id": "638f8de03cecb2b4d863fca1"
                            },
                            {
                                "subtitlesWatched": [
                                    {
                                        "video": [
                                            "l"
                                        ],
                                        "_id": "638f8df53cecb2b4d863fd1f"
                                    }
                                ],
                                "_id": "638f8df53cecb2b4d863fd1e"
                            },
                            {
                                "course": "jjjjjjjj",
                                "subtitlesWatched": [
                                    {
                                        "title": "jjjjjjj",
                                        "video": [
                                            "l"
                                        ],
                                        "_id": "638f8e49e1fc6c30b5e3c1e1"
                                    }
                                ],
                                "_id": "638f8e49e1fc6c30b5e3c1e0"
                            },
                            {
                                "_id": "638f8e51e1fc6c30b5e3c269",
                                "subtitlesWatched": []
                            },
                            {
                                "_id": "638f8e64e1fc6c30b5e3c2f4",
                                "subtitlesWatched": []
                            },
                            {
                                "course": "hhhhhhhh",
                                "subtitlesWatched": [
                                    {
                                        "title": "jjjjjjj",
                                        "video": [
                                            "ll"
                                        ],
                                        "_id": "638f8e8d007d58e3c6c4120b"
                                    },
                                    {
                                        "title": "m",
                                        "video": [
                                            "pleaseeeeeeeeeee"
                                        ],
                                        "_id": "638f8f4e007d58e3c6c41305"
                                    },
                                    {
                                        "video": [
                                            "pleaseeeeeeeeeee"
                                        ],
                                        "_id": "638f8f4e007d58e3c6c41339"
                                    }
                                ],
                                "_id": "638f8e8d007d58e3c6c4120a"
                            },
                            {
                                "course": "DDD",
                                "subtitlesWatched": [
                                    {
                                        "title": "DDD",
                                        "video": [
                                            "dddd"
                                        ],
                                        "_id": "638f96de8ce753fcea9ccf9e"
                                    },
                                    {
                                        "video": [
                                            "f"
                                        ],
                                        "_id": "638f99f9a3d28d29fdd4cdd9"
                                    }
                                ],
                                "_id": "638f96de8ce753fcea9ccf9d"
                            },
                            {
                                "subtitlesWatched": [
                                    {
                                        "video": [
                                            "jjjjjjj"
                                        ],
                                        "_id": "638f972305e43a9db6b68011"
                                    }
                                ],
                                "_id": "638f972305e43a9db6b68010"
                            },
                            {
                                "_id": "638f9761c4c1392472670f81",
                                "subtitlesWatched": []
                            },
                            {
                                "_id": "638f9770c4c1392472671030",
                                "subtitlesWatched": []
                            },
                            {
                                "course": " n",
                                "subtitlesWatched": [
                                    {
                                        "title": "DDD",
                                        "video": [
                                            "f",
                                            "h"
                                        ],
                                        "_id": "638f9b98385411b626273a62"
                                    }
                                ],
                                "_id": "638f9b98385411b626273a61"
                            },
                            {
                                "course": " a5eerisa",
                                "subtitlesWatched": [
                                    {
                                        "title": "DDD",
                                        "video": [
                                            "h",
                                            "yarab"
                                        ],
                                        "_id": "638f9fdf88120dcc4172743c"
                                    },
                                    {
                                        "title": "y",
                                        "video": [
                                            "yarab",
                                            "yarab",
                                            "yarab"
                                        ],
                                        "_id": "638f9ff388120dcc4172757f"
                                    }
                                ],
                                "_id": "638f9fdf88120dcc4172743b"
                            }
                        ],
                        "notes": [
                            {
                                "course": "Advanced Computer Lab",
                                "subtitleNotes": [
                                    {
                                        "videoTitle": "Preview1",
                                        "notes": "This is soo cool",
                                        "_id": "63931718725066deecbe595d"
                                    },
                                    {
                                        "videoTitle": "Subtitle1",
                                        "notes": "oh yeah",
                                        "_id": "63931740725066deecbe59e5"
                                    }
                                ],
                                "_id": "63931718725066deecbe595c"
                            }
                        ],
                        "__v": 0,
                        "exercises": [
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "titl43",
                                "answers": [
                                    ""
                                ],
                                "grade": 100,
                                "_id": "6394dd95af3109d99533ac0e"
                            },
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "Introduction to Mern Stack",
                                "answers": [
                                    "c",
                                    "a"
                                ],
                                "grade": 0,
                                "_id": "6394e2a452c12f3a2f067dc1"
                            },
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "m",
                                "answers": [
                                    "b",
                                    "d"
                                ],
                                "grade": 50,
                                "_id": "6395aa3f314e3490586f1bad"
                            }
                        ]
                    },
                    {
                        "wallet": 0,
                        "_id": "638a211fdae5256326254c2b",
                        "user": "638a211fdae5256326254c29",
                        "courseInfo": [],
                        "exercises": [
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "titl43",
                                "answers": [
                                    "b"
                                ],
                                "grade": 100,
                                "_id": "6395b1c6314e3490586f272e"
                            },
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "m",
                                "answers": [
                                    "d",
                                    "d"
                                ],
                                "grade": 50,
                                "_id": "6395b1de314e3490586f2741"
                            },
                            {
                                "course": "6384e316b82023e53230ade0",
                                "subtitle": "Introduction to Mern Stack",
                                "answers": [
                                    "b",
                                    "a"
                                ],
                                "grade": 0,
                                "_id": "6398500d544bbaa2ad50723d"
                            }
                        ],
                        "notes": [
                            {
                                "course": "Advanced Computer Lab",
                                "subtitleNotes": [
                                    {
                                        "videoTitle": "Preview1",
                                        "notes": "ay haga tanynn",
                                        "_id": "63932328ab71b314417ea5cf"
                                    },
                                    {
                                        "videoTitle": "Subtitle1",
                                        "notes": "nnnn",
                                        "_id": "639345f3833e627cecd7595a"
                                    }
                                ],
                                "_id": "63932328ab71b314417ea5ce"
                            }
                        ],
                        "__v": 0,
                        "videoWatched": [
                            {
                                "course": "Computer Architecture",
                                "subtitlesWatched": [
                                    {
                                        "title": "Ay haga",
                                        "video": [
                                            "mn"
                                        ],
                                        "_id": "639f35d6fe535591359d32dd"
                                    }
                                ],
                                "_id": "639f35d6fe535591359d32dc"
                            }
                        ]
                    },
                    {
                        "wallet": 0,
                        "_id": "638a534b9d67eeffd4d7c3cf",
                        "user": "638a534b9d67eeffd4d7c3cd",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "wallet": 0,
                        "_id": "638b1483dbf398f2ac019d7c",
                        "user": "638b1482dbf398f2ac019d7a",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "wallet": 0,
                        "_id": "638b15b7dbf398f2ac019d82",
                        "user": "638b15b7dbf398f2ac019d80",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "wallet": 0,
                        "_id": "638ca0625af0c5318aba216a",
                        "user": "638ca0625af0c5318aba2168",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "_id": "638fa355d34f3309757fde90",
                        "user": "638fa355d34f3309757fde8e",
                        "courseInfo": [
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
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": [
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
                        "wallet": 230
                    },
                    {
                        "wallet": 0,
                        "_id": "638fc10729b7fae0650dc29e",
                        "user": "638fc10729b7fae0650dc29c",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "wallet": 0,
                        "_id": "638fc946e015483af10372b5",
                        "user": "638fc946e015483af10372b3",
                        "courseInfo": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0,
                        "videoWatched": []
                    },
                    {
                        "wallet": 0,
                        "_id": "63a74913f9638618b0fae43d",
                        "user": "63a74913f9638618b0fae43b",
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "wallet": 0,
                        "_id": "63a74aa6cb171ee80b07a42c",
                        "user": "63a74aa6cb171ee80b07a42a",
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "wallet": 0,
                        "_id": "63a74e20f78ec8f3ec3ea53b",
                        "user": "63a74e20f78ec8f3ec3ea539",
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "wallet": 0,
                        "_id": "63a8bd0923f29b506dd76123",
                        "user": "63a8bd0823f29b506dd76121",
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "wallet": 0,
                        "_id": "63a8bdd323f29b506dd76129",
                        "user": "63a8bdd323f29b506dd76127",
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "_id": "63b18a4f8c0c31094ce60c00",
                        "user": "63b18a4f8c0c31094ce60bfe",
                        "wallet": 0,
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "_id": "63b5ee465bf501f7f86b42ab",
                        "user": "63b5ee465bf501f7f86b42a9",
                        "wallet": 0,
                        "courseInfo": [],
                        "videoWatched": [],
                        "exercises": [],
                        "notes": [],
                        "__v": 0
                    },
                    {
                        "_id": "63b689ebf79b01670e5e1856",
                        "user": "63b689ebf79b01670e5e1854",
                        "wallet": 100,
                        "courseInfo": [
                            {
                                "refund": {
                                    "set": false
                                },
                                "percentage": {
                                    "progress": 15.399999999999999,
                                    "total": 15.4,
                                    "exer": 0.7000000000000001
                                },
                                "course": "63850bb178ae97605db827cb",
                                "pricePayed": {
                                    "$numberDecimal": "100"
                                },
                                "rating": true,
                                "rateInst": true,
                                "certificate": "true",
                                "registeredAt": "2023-01-05T08:41:32.297Z",
                                "firstOpen": false,
                                "subtitlesTotal": [
                                    {
                                        "exercises": 1,
                                        "videos": 2,
                                        "_id": "63b68d3cf79b01670e5e18c3"
                                    },
                                    {
                                        "exercises": 1,
                                        "videos": 1,
                                        "_id": "63b68d3cf79b01670e5e18c4"
                                    }
                                ],
                                "_id": "63b68d3cf79b01670e5e18c2",
                                "rateCourse": 4,
                                "rateInstructor": 4
                            }
                        ],
                        "videoWatched": [
                            {
                                "course": "Computer Architecture",
                                "subtitlesWatched": [
                                    {
                                        "title": "Ay haga",
                                        "video": [
                                            "Inside your computer - Bettina Bair",
                                            "How computer memory works - Kanawat Senanan"
                                        ],
                                        "_id": "63b68d50f79b01670e5e1948"
                                    },
                                    {
                                        "title": "leh",
                                        "video": [
                                            "How exactly does binary code work? "
                                        ],
                                        "_id": "63b68d9af79b01670e5e19c0"
                                    }
                                ],
                                "_id": "63b68d50f79b01670e5e1947"
                            }
                        ],
                        "exercises": [
                            {
                                "course": "63850bb178ae97605db827cb",
                                "subtitle": "Ay haga",
                                "answers": [
                                    "a",
                                    "a"
                                ],
                                "grade": 50,
                                "_id": "63b68d7ef79b01670e5e1991"
                            },
                            {
                                "course": "63850bb178ae97605db827cb",
                                "subtitle": "leh",
                                "answers": [
                                    "a"
                                ],
                                "grade": 100,
                                "_id": "63b68dabf79b01670e5e1a10"
                            }
                        ],
                        "notes": [
                            {
                                "course": "Computer Architecture",
                                "subtitleNotes": [
                                    {
                                        "videoTitle": "How exactly does binary code work? ",
                                        "notes": "hellooooo",
                                        "_id": "63b68dc7f79b01670e5e1a25"
                                    }
                                ],
                                "_id": "63b68dc7f79b01670e5e1a24"
                            }
                        ],
                        "__v": 0
                    }
                ]
            }
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET refunds", () => {
    test("Get refunds", (done) => {
      request(app)
        .get("/Instructor/getRefunds")
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

describe("GET followups/:id", () => {
    test("Get followups", (done) => {
      request(app)
        .get("/Admin/getfollow/")
        .expect(200)
        .expect((res) => {
          {
            {
                res.body._id = "63b68f29f79b01670e5e1cba",
                res.body.title= "problem",
                res.body.body= "i have a problem",
                res.body.type= "Technical",
                res.body.reporter= {
                    "_id": "63b689ebf79b01670e5e1854",
                    "fName": "Nada",
                    "lName": "Ibrahim",
                    "gender": "Female",
                    "username": "nibrahim",
                    "email": "nada.ibrahim89@gmail.com",
                    "password": "$2b$10$fuDgY1poXS2AqSSP1Mppk.N4YaEDFR1HR3hT1g5ud6IXeaseLVl5y",
                    "type": "individual",
                    "createdAt": "2023-01-05T08:27:23.614Z",
                    "updatedAt": "2023-01-05T09:06:32.510Z",
                    "__v": 0
                },
                res.body.adminSeen= [
                    "6384c26d9bed14d581bf628e",
                    "6384c26d9bed14d581bf628e"
                ],
                res.body.adminMessageSeen= true,
                res.body.reporterMessageSeen= false,
                res.body.solved= "pending",
                res.body.followUp= [
                    {
                        "from": "individual",
                        "body": "helloooo",
                        "_id": "63b690e1f79b01670e5e1cfd"
                    },
                    {
                        "from": "individual",
                        "body": "helloooo ya 3alam",
                        "_id": "63b690e8f79b01670e5e1d00"
                    },
                    {
                        "from": "individual",
                        "body": "enta ya zeft",
                        "_id": "63b690eff79b01670e5e1d04"
                    },
                    {
                        "from": "admin",
                        "body": "na3am ya zeftein",
                        "_id": "63b694eef79b01670e5e1f2e"
                    }
                ],
                res.body.createdAt= "2023-01-05T08:49:45.545Z",
                res.body.updatedAt= "2023-01-06T16:47:33.659Z",
                res.body.__v= 0,
                res.body.adminSolver= {
                    "_id": "6384c26d9bed14d581bf628e",
                    "fName": "Mariam",
                    "lName": "Tamer",
                    "gender": "Female",
                    "username": "mariam237",
                    "email": "mariamtamer237@gmail.com",
                    "password": "$2b$10$3gFs5kGjwS6vrm05jofOq.cQateWQgSg76MCF03KyesSAU/FLvhgO",
                    "type": "admin",
                    "__v": 0,
                    "updatedAt": "2023-01-06T16:35:41.154Z"
                },
                res.body.pendingReason= "3eera"
            }
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET followups/:id", () => {
    test("Get followups", (done) => {
      request(app)
        .get("/Individual/getfollow/")
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


