const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT } = process.env

mongoose.connect('mongodb://mongo:27017/db-test-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log('connected'))
.catch(err => console.log(err))
