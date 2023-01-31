const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({

    roomName:{
        type: String , requied: true,
    },
    roomId:{
        type: String , requied: true,
    },
    userId:{
        type: String , requied: true,
    },
    fromDate:{
        type: String , requied: true,
    },
    toDate:{
        type: String , requied: true,
    },
    totalAmount:{
        type: Number , requied: true,
    },
    totalDays:{
        type: Number , requied: true,
    },
    transactionId:{
        type: String , requied: true,
    },
    status:{
        type: String , requied: true, default: "booked"
    },
},{
    timestamps: true
})

const bookingModel = mongoose.model("booking", bookingSchema)

module.exports = bookingModel