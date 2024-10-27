const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/database")
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 4000
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload")


database.connect()
app.use(express.json())
app.use(cookieParser)

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,

    })
)

app.use(
   fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
   })
)

cloudinaryConnect();


// routes:
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);


// default
app.get("/", (req, res) => {
    return res.json({
        message: "Your server is up and running",
        success: true
    })
})

app.listen(PORT, ()=> {
    console.log("App is Running on", PORT)
})