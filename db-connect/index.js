const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect("mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to DB successfully')
    })
    .catch(err => {
      console.log('DB connection failed: |||' + err)
    })
}