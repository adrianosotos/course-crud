const express = require('express')
const cors = require('cors');
require('./database/mongoose')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json());
app.use('/api/courses', require('./routes/courses'))
app.use('/api/users', require('./routes/viewRouter'))
app.use('/api/auth', require('./routes/authRouter'))

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`)
})