const express = require ('express')
const router = express.Router()
const {addAdmin, addInstructor, addCorporate}= require("../Controller/AdminAdd")


//add another admin
router.post('/admin',express.json(),addAdmin)

//add instructor
router.post('/inst',addInstructor)

//add corprate tranieee
router.post('/corp',addCorporate)

module.exports = router 