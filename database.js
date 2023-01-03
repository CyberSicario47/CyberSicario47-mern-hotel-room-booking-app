const mongoose = require('mongoose')
const username = process.env.USERNAME
const password = process.env.MONGO_DB_PASS
const databaseName = process.env.MONGO_DATABASE
let monogUrl = `mongodb+srv://${username}:${password}@hotel-cluster.dbzicny.mongodb.net/${databaseName}`

mongoose.connect(monogUrl, {useUnifiedTopology: true, useNewUrlParser: true})

let connection = mongoose.connection

connection.on('error',()=>{
    console.log('AN error has occured while connecting to the database')
})

connection.on('connected',()=>{
    console.log('successfully connected to the database')
})

module.exports = mongoose;