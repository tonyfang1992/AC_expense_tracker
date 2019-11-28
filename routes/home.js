const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  let totalAmount = Number(0)
  Record.find((err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    if (err) return console.error(err)
    return res.render('index', { records: records, totalAmount: totalAmount })
  })
})

module.exports = router