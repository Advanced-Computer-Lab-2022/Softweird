const express = require ('express')
const router = express.Router()
const Course =  require ('../Modules/Course')
const {countryCurrency} = require('../Controller/CurrencyRequest')

router.get('/',countryCurrency)

module.exports = router