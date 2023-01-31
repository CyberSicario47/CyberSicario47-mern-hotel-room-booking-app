const express = require("express");
const router = express.Router();
const stripe = require('stripe')("sk_test_51MVqAsHdZ9WM6lOlS9bUjHLH6EtFFRfV2Cudlapw4M6w54PjN2PK4ne3Ldxegq8cbDAQD3V917WBZoNVbTr9b0wv006ZhG39ME");
const {v4: uuidv4 } = require('uuid');
const Booking = require("../models/booking");
const roomModel = require("../models/rooms");

// router.post("/register", async (req, res) => {
//   console.log(req.body)
//   const email = req.body.email;

//   const user = new User({
//     name: req.body.name,
//     email: email,
//     password: req.body.password,
//   });
//   try {
//     const oldUser = await User.findOne({ email: email });
//     if (!oldUser) {
//       await user.save(user);
//       return res.send("User Saved Successfully");
//     }
//     console.log(oldUser);
//     return res.send("user Already exists");
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error });
//   }
// });

router.post("/bookroom", async (req, res) => {
  console.log(req.body);
  const { roomData, userId, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;
  try {
    const customer = await stripe.customers.create({
      email:token.email,
      source:token.id
    })

    const payment = await stripe.charges.create({
      amount : totalAmount * 100,
      customer : customer.id,
      currency : "USD",
      receipt_email: token.email,
    },{
      idempotencyKey: uuidv4()
    })

    const bookingDetails = new Booking({
      roomName: roomData.name,
      roomId: roomData._id,
      userId,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      transactionId: "1234",
    });

    if(payment){
      const booking = await bookingDetails.save();

      const tempRoom = await roomModel.findOne({_id: roomData._id});
      tempRoom.currentbookings.push({
        bookingId: booking._id,
        fromDate,
        toDate,
        userId,
        status: booking.status,
      });
      await tempRoom.save();
      console.log("this is  the temproom", tempRoom, booking);
      return res
          .status(200)
          .send({ message: "You  have successfull booked the room" });
    }else{
    return res
      .status(406)
      .send({ message: "Something has failed and through an error" });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(`${req.params.id}`);
//     return res.json({ user });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error });
//   }
// });

module.exports = router;
