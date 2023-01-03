const express = require('express')
require('dotenv').config();
const databseConfig = require('./database')
const roomRoutes = require('./routes/room.routes')
const app = express()

app.use('/api/rooms',roomRoutes)

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('working')
return `Listening to the server at ${port}`
})