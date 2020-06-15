const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect("mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to DB successfully')
    })
    .catch(err => {
      console.log('DB connection failed: |||' + err)
    })
}