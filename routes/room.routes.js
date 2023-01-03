const express = require('express')
const router = express.Router();

const Room = require('../models/rooms')


router.get('/getallrooms',async(req, res)=>{
    try{
        const rooms = await Room.find({})
        return res.json({rooms});

    }catch (error){
        console.log(error)
        return res.status(400).json({message: error})
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const room = await Room.findById(`${req.params.id}`)
        return res.json({room});

    }catch (error){
        console.log(error)
        return res.status(400).json({message: error})
    }
})

module.exports = router;