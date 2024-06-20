const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(express.json());
connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://rutvik:rutvik@cluster0.8gntkhd.mongodb.net/HospitalManagement")
        console.log("database connected succesfully");

    } catch (error) {
        console.error("MongoDB Connection Error :", error);
    }
}
connectDB();

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});