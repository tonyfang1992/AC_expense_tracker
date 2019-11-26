const recordList = require('../../record.json')
const mongoose = require('mongoose')
const record_mongodbSchema = require('../record.js')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongoDB error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  let records = recordList.results

  for (let i = 0; i < records.length; i++) {
    record_mongodbSchema.create({
      name: records[i].name,
      category: records[i].category,
      date: records[i].date,
      amount: records[i].amount
    })
  }
  console.log('done')
})