require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const upload = require('./multer');
const fs = require('fs');
const path = require('path');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const TravelStory = require('./models/travelStory.model')
const { authenticateToken } = require('./utilities');

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/hello', async (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.post('/create-account', async (req, res) => {
    const {fullname, email, password } = req.body;
    if(!fullname || !email || !password){
        res.status(400).json({message: 'Please provide all the required fields'});
        return;
    }

    const isUser = await User.findOne({email});
    if(isUser){
        res.status(400).json({error: true, message: "User already exits"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullname,
        email,
        password: hashedPassword
    })

    await user.save();

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "72h"}
    )

    return res.status(201).json(
        {
            error: false,
            user: {fullname: user.fullname, email: user.email},
            accessToken,
            message: "Register Succesfully"

        }
    )
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            error: true,
            message: "password or email not null"
        })
        return;
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400).json({
            error : true,
            message : "user not found!"
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        res.status(400).json({
            error: true,
            message: "Invalid"
        })
        return
    }

    const acccesToken = jwt.sign(
        {userId : user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "72h"}
    )

    return res.status(200).json({
        error: false,
        message: "Login succesful",
        user: {fullname : user.fullname, email: user.email},
        acccesToken
    })
})

app.get("/get-user", authenticateToken,async (req, res) => {
    const {userId} = req.user;
    console.log(req.user);

    const isUser = await User.findOne({_id: userId });

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: ""
    })
})

app.post("/add-travel-story", authenticateToken, async (req, res) => {
    const {title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const {userId} = req.user;

    if(!title || !story || !visitedDate || !imageUrl || !visitedLocation){
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate
        })
        await travelStory.save();
        res.status(200).json({
            story: travelStory,
            message: "Added successfully"
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }


})

app.get("/get-all-stories", authenticateToken,async (req, res) => {
    const {userId} = req.user;
    try {
        const travelStories = await TravelStory.find({userId}).sort({isFavourite: -1});
        res.status(200).json({stories: travelStories});
    } catch (error) {
        res.status(400).json({
            error: false,
            message: error.message
        });
    }
})

app.post("/image-upload", upload.single("image"), async(req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({
                error: true,
                message: "no image uploaded"
            })
        }

        const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        })
    }
})

app.listen(8000);
module.exports = app;