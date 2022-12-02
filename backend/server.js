const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
var cors = require('cors');
const port = process.env.PORT

connectDB()

const app = express()

app.use(cors({origin: true, credentials: true}));

// middleware for dealing with body data 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/emergency-camps', require('./routes/emergencyCampRoutes'))
app.use('/api/emergency-camps/camps', require('./routes/campRoutes'))
app.use('/api/end-users', require('./routes/endUserRoutes'))
app.use('/api/end-users/emergency-camps', require('./routes/endUserEndPoints/emergencyCampRoutes'))
app.use('/api/end-users/registerations', require('./routes/endUserEndPoints/registerationRoutes'))
app.use('/api/registerations', require('./routes/registerationRoutes'))
app.use('/api/permissions', require('./routes/permissionRoutes'))
app.use('/api/notification', require('./routes/notificationRoutes'))
app.use('/api/resources',require('./routes/resourceRoutes'))
app.use('/api/funds',require('./routes/FundRoutes'))
app.use(errorHandler)
app.listen(port, () => console.log(`SERVER STARTED AT ${port}`))