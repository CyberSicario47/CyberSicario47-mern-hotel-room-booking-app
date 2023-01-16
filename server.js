const express = require('express')
require('dotenv').config();
const databseConfig = require('./database')
const roomRoutes = require('./routes/room.routes')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use('/api/rooms',roomRoutes)
app.use('/api/users',userRoutes)

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('working')
return `Listening to the server at ${port}`
})