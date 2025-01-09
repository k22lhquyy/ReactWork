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
        res.status(201).json({
            imageUrl
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        })
    }
})

app.delete("delete-image", async (req, res) => {
    const {imageUrl} = req.query;

    if(!imageUrl) {
        return res.status(400).json({
            error: false,
            message: "imageUrl parameter is required"
        })
    }

    try {
        const filename = path.basename(imageUrl);

        const filePath = path.join(__dirname, 'uploads', filename);

        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            res.status(200).json({
                error: false,
                message: "image delete success!"
            })
        }else {
            res.status(400).json({
                error: true,
                message: "Image not found!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

app.put("/edit-story/:id", authenticateToken,async (req, res) => {
    const { id } = req.query;
    const { title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const { userId } = req.user;


    if(!title || !story || !visitedDate || !imageUrl || !visitedLocation){
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const travelStory = TravelStory.findOne({_id: id, userId: userId});
        if (!travelStory) {
            return res.status(404).json({ error: true, message: "Travel story not found" });
        }
        
        const placeholderImgUrl = `http://localhost:8000/assets/banner1.png`;
        
        travelStory.title = title;
        travelStory.story = story;
        travelStory.visitedLocation = visitedLocation;
        travelStory.imageUrl = imageUrl || placeholderImgUrl;
        travelStory.visitedDate = parsedVisitedDate;
        
        await travelStory.save();
        res.status(200).json({ story: travelStory, message: "Update Successful" });

    }catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

app.delete("/delete-story/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        // Find the travel story by ID and ensure it belongs to the authenticated user
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

        if (!travelStory) {
            return res
                .status(404)
                .json({ error: true, message: "Travel story not found" });
        }

        // Delete the travel story from the database
        await travelStory.deleteOne({ _id: id, userId: userId });

        // Extract the filename from the imageUrl
        const imageUrl = travelStory.imageUrl;
        const filename = path.basename(imageUrl);

        // Define the file path
        const filePath = path.join(__dirname, 'uploads', filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            }
        });
        
        res.status(200).json({ message: "Travel story deleted successfully" });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ error: true, message: "Something went wrong" });
    }
});

app.put("/update-is-favourite/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const { userId } = req.user;

    try {
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

        if (!travelStory) {
            return res.status(404).json({ error: true, message: "Travel story not found" });
        }

        travelStory.isFavourite = isFavourite;

        await travelStory.save();
        res.status(200).json({ story: travelStory, message: 'Update Successful' });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});


app.get("/search", authenticateToken, async (req, res) => {
    const { query } = req.query; // Sửa cú pháp destructuring
    const userId = req.user; // Sửa cú pháp gán giá trị
  
    if (!query) {
      return res.status(404).json({ error: true, message: "query is required" });
    }
  
    try {
      const searchResults = await TravelStory.find({
        userId: userId,
        $or: [
          { title: { $regex: query, $options: "i" } }, // Sửa "1" thành "i" để regex hoạt động đúng
          { story: { $regex: query, $options: "i" } },
          { visitedLocation: { $regex: query, $options: "i" } }, // Sửa cú pháp regex
        ],
      }).sort({ isFavourite: -1 }); // Sửa sort
  
      res.status(200).json({ stories: searchResults });
    } catch (err) {
      res.status(500).json({ error: true, message: "Internal server error" }); // Xử lý lỗi
    }
});

app.get("/travel-stories/filter", authenticateToken, async (req, res) => {
    const { startDate, endDate } = req.query;
    const {userId} = req.user; // Sửa cách lấy userId từ req.user
  
    try {
      // Convert startDate và endDate từ milliseconds sang Date object
      const start = new Date(parseInt(startDate));
      const end = new Date(parseInt(endDate));
  
      // Tìm kiếm các câu chuyện du lịch thuộc về người dùng đã xác thực và nằm trong khoảng thời gian
      const filteredStories = await TravelStory.find({
        userId: userId,
        visitedDate: { $gte: start, $lte: end },
      }).sort({ isFavourite: -1 });
  
      res.status(200).json({ stories: filteredStories });
    } catch (error) {
      res.status(500).json({ error: true, message: error.message }); // Xử lý lỗi với message chi tiết
    }
});
  


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(8000);
module.exports = app;