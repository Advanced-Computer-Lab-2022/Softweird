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
        .get("/Instructor/myProfile/6384c29e9bed14d581bf6292")
        .expect(200)
        .expect((res) => {
            {
                res.body.rating= {
                    "rate": {
                        "$numberDecimal": "3.9"
                    },
                    "numberPeople": 10
                },
                res.body._id= "6384c29e9bed14d581bf6294",
                res.body.user= {
                    "_id": "6384c29e9bed14d581bf6292",
                    "fName": "Hala",
                    "lName": "Medhat",
                    "gender": "Female",
                    "username": "halamedhat",
                    "email": "hala@gmail.com",
                    "password": "$2b$10$1QnsXpqoaRXsmOMa2epUNuqZ.a5qwWOoq7DqioxczzN3r74uLdzT2",
                    "type": "instructor",
                    "__v": 0
                },
                res.body.biography= "Hello. This is Hala OR NOT!!!",
                res.body.amountOwed= {
                    "$numberDecimal": "1492.5"
                },
                res.body.reviews= [
                    {
                        "traineeId": {
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
                        "review": "lela",
                        "date": "2022-12-31T21:15:33.519Z",
                        "_id": "63b0a6754b6362558e00ef3b"
                    },
                    {
                        "traineeId": {
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
                        "review": "kont hala2i dah ezzay asasan ya mo2meneen",
                        "date": "2023-01-05T09:03:14.694Z",
                        "_id": "63b69252f79b01670e5e1e53"
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
        .get("/Instructor/myProfile/invalidid")
        .expect(404)
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
      .patch("Instructor/updateMyPass/6384c29e9bed14d581bf6292")
      .send({
          "password" :"Hala123!"
  })
      .expect(200)
      .expect((res) => { {
        res.body._id= "6384c29e9bed14d581bf6292",
        res.body.fName= "Hala",
        res.body.lName= "Medhat",
        res.body.gender= "Female",
        res.body.username= "halamedhat",
        res.body.email= "hala@gmail.com",
        res.body.password= "$2b$10$Kr0UoabEjux/GHnZSh0LgeQ7HvIHAqMqKC1SS9.ODKln5hBXOZe9S",
        res.body.type= "instructor",
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
        .patch("Instructor/updateMyPass/invalidid")
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

          
describe("POST add course", () => {
    test("add course", (done) => {
      request(app)
      .post("/Instructor/addOneCourse/6384c29e9bed14d581bf6292")
      .send({
          "Title":"Physics",
          "Subject": "Science",
          "Price" :"Free",
          "Summary":"very important course"
  })
        .expect(200)
        .expect((res) => {
          {
           res.body= "Sucess"
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


  describe("POST add course", () => {
    test("add coursewith title already exist", (done) => {
      request(app)
      .post("/Instructor/addOneCourse/6384c29e9bed14d581bf6292")
      .send({
          "Title":"Physics",//already exist title
          "Subject": "Science",
          "Price" :"Free",
          "Summary":"very important course"
  })
        .expect(200)
        .expect((res) => {
          {
           res.body.error= "Course already exists"
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

describe("GET my courses", () => {
    test("Get my courses", (done) => {
      request(app)
        .get("/Instructor/instCourses/6384c29e9bed14d581bf6292")
        .expect(200)
        .expect((res) => {
          {
            [
                {
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
                },
                {
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
                {
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
                    "_id": "63861265b09a3cf8f51514b4",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Math4",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 0,
                    "subject": "Mathematics",
                    "price": "Free",
                    "summary": "it is very important!",
                    "enrolledStudents": 0,
                    "Finished": false,
                    "subtitles": [
                        {
                            "title": "Probability",
                            "totalHours": 0,
                            "_id": "63b61e7e5bf501f7f86b574d",
                            "video": [],
                            "exercise": [
                                {
                                    "number": "1",
                                    "question": "I'm eating what?",
                                    "choices": [
                                        "Sandwich",
                                        "Nutbar",
                                        "Seeds",
                                        "Pasta"
                                    ],
                                    "answer": "c",
                                    "_id": "63b61f675bf501f7f86b5750"
                                },
                                {
                                    "number": "2",
                                    "question": "What type of seeds?",
                                    "choices": [
                                        "White",
                                        "Brown",
                                        "Zebra",
                                        "Not Seeds"
                                    ],
                                    "answer": "a",
                                    "_id": "63b61f675bf501f7f86b5751"
                                }
                            ]
                        }
                    ],
                    "reviews": [],
                    "createdAt": "2022-11-29T14:08:37.918Z",
                    "updatedAt": "2023-01-05T03:26:25.943Z",
                    "__v": 0
                },
                {
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
                    "_id": "63b19f098c0c31094ce60c1f",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Introduction to AI",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 0,
                    "subject": "Artificial Intelligence",
                    "price": "100",
                    "summary": "AI transforms the way we live and work. We use AI in our daily lives, from asking Siri for directions, to getting Netflix movie recommendations and drones shipping products to customers. Companies are creating innovative solutions by using subsets of AI such as machine learning, deep learning and natural language processing.",
                    "enrolledStudents": 0,
                    "Finished": false,
                    "Deleted": false,
                    "subtitles": [],
                    "reviews": [],
                    "createdAt": "2023-01-01T14:56:09.632Z",
                    "updatedAt": "2023-01-05T01:33:52.040Z",
                    "__v": 0
                },
                {
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
                    "_id": "63b5e9d25bf501f7f86b3f45",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Finance",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 21.2,
                    "subject": "Business",
                    "price": "Free",
                    "summary": "This course is an introduction to business, everyone must take it",
                    "enrolledStudents": 0,
                    "Finished": true,
                    "Deleted": false,
                    "subtitles": [
                        {
                            "title": "bad",
                            "totalHours": 21.2,
                            "_id": "63b5e9ea5bf501f7f86b3f48",
                            "video": [
                                {
                                    "link": "https://www.youtube.com/watch?v=wAskhWdHWbE",
                                    "text": "Blind Date",
                                    "length": "21.2",
                                    "preview": true,
                                    "_id": "63b5ea6e5bf501f7f86b3f4d"
                                }
                            ],
                            "exercise": []
                        }
                    ],
                    "reviews": [],
                    "createdAt": "2023-01-04T21:04:18.379Z",
                    "updatedAt": "2023-01-04T21:10:53.493Z",
                    "__v": 0
                },
                {
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
                    "_id": "63b69836f79b01670e5e2442",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Intro to taking agazat",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 34,
                    "subject": "Business",
                    "price": "Free",
                    "summary": "EL sabt agaza walla la2 ya wlad el teeeeetttt",
                    "enrolledStudents": 0,
                    "Finished": true,
                    "Deleted": false,
                    "subtitles": [
                        {
                            "title": "El 7ad mish agaza",
                            "totalHours": 9.5,
                            "_id": "63b69883f79b01670e5e2446",
                            "video": [
                                {
                                    "link": "https://www.youtube.com/watch?v=5wFyZJ8yH9Q",
                                    "text": "El 7ad mish agaza",
                                    "length": "9.5",
                                    "preview": true,
                                    "_id": "63b69927f79b01670e5e2450"
                                }
                            ],
                            "exercise": [
                                {
                                    "number": "1",
                                    "question": "El sabt...",
                                    "choices": [
                                        "agaza",
                                        "mish agaza",
                                        "ma3rafsh",
                                        "who are you asasan"
                                    ],
                                    "answer": "c",
                                    "_id": "63b6998cf79b01670e5e2455"
                                }
                            ]
                        },
                        {
                            "title": "la2 el 7ad agaza",
                            "totalHours": 24.5,
                            "_id": "63b6988cf79b01670e5e2449",
                            "video": [
                                {
                                    "link": "https://www.youtube.com/watch?v=RpgcYiky7uw",
                                    "text": "Hello",
                                    "length": "24.5",
                                    "preview": true,
                                    "_id": "63b699d2f79b01670e5e248e"
                                }
                            ],
                            "exercise": [
                                {
                                    "number": "1",
                                    "question": "Aaa",
                                    "choices": [
                                        "a",
                                        "b",
                                        "c",
                                        "d"
                                    ],
                                    "answer": "c",
                                    "_id": "63b69a1ff79b01670e5e2495"
                                }
                            ]
                        }
                    ],
                    "reviews": [],
                    "createdAt": "2023-01-05T09:28:22.053Z",
                    "updatedAt": "2023-01-05T09:36:44.601Z",
                    "__v": 0
                },
                {
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
                    "_id": "63b8583284fdca431ef1da97",
                    "instructor_id": "6384c29e9bed14d581bf6292",
                    "title": "Physics",
                    "rating": {
                        "$numberDecimal": "0"
                    },
                    "numberRating": 0,
                    "totalHours": 0,
                    "subject": "Science",
                    "price": "Free",
                    "summary": "very important course",
                    "enrolledStudents": 0,
                    "Finished": false,
                    "Deleted": false,
                    "subtitles": [],
                    "reviews": [],
                    "createdAt": "2023-01-06T17:19:46.237Z",
                    "updatedAt": "2023-01-06T17:19:46.237Z",
                    "__v": 0
                }
            ]
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("GET my courses wrong instructor id", () => {
    test("Get my courses", (done) => {
      request(app)
        .get("/Instructor/instCourses/6384c29e9bed14d581bf6292")
        .expect(404)
        .expect((res) => {
          {
           res.body.error= "no such instructor"
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

describe("PATCH promote course", () => {
    test("update discount on course", (done) => {
      request(app)
        .patch("/Instructor/promoteCourse")
        .send({
            "courseTitle":"Physics",
            "promotion": "30",
            "endDate" :"02/01/2023"
    })
        .expect(200)
        .expect((res) => {
          {
            {
                res.body.promotionInst= {
                    "set": true,
                    "value": {
                        "$numberDecimal": "30"
                    },
                    "endDate": "2023-01-31T22:00:00.000Z"
                },
                res.body.promotionAdmin= {
                    "set": false,
                    "value": {
                        "$numberDecimal": "0"
                    }
                },
                res.body._id= "63b8583284fdca431ef1da97",
                res.body.instructor_id= "6384c29e9bed14d581bf6292",
                res.body.title= "Physics",
                res.body.rating= {
                    "$numberDecimal": "0"
                },
                res.body.numberRating= 0,
                res.body.totalHours= 0,
                res.body.subject= "Science",
                res.body.price= "Free",
                res.body.summary= "very important course",
                res.body.enrolledStudents= 0,
                res.body.Finished= false,
                res.body.Deleted= false,
                res.body.subtitles= [],
                res.body.reviews= [],
                res.body.createdAt= "2023-01-06T17:19:46.237Z",
                res.body.updatedAt= "2023-01-06T17:28:32.931Z",
                res.body.__v= 0
            }
        }
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


  describe("PATCH promote course wrong title", () => {
    test("update discount on course", (done) => {
      request(app)
        .patch("/Instructor/promoteCourse")
        .send({
            "courseTitle":"Physicssssssssss",
            "promotion": "30",
            "endDate" :"02/01/2023"
    })
        .expect(404)
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

