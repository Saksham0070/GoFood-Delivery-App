const mongoose = require("mongoose");
const { MONGO_URL } = require("../frontend/mernapp/src/config");

// Define the MongoDB connection URL
const mongoURL = MONGO_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");

});

//Fetching Food-Category directly from Database (Collection)
db.on("open",async ()=>{

  try{
    const foodCategoryItems = db.collection('foot-category');
    const foodCategory = await foodCategoryItems.find().toArray();
    const foodItemsElements = db.collection('food-items');
    const foodItems = await foodItemsElements.find().toArray();
    global.foodItems = foodItems;
    global.foodCategory = foodCategory;
    console.log(global.foodCategory);
    console.log(global.foodItems)
  }catch(err){
    console.log(err,"Error Fetching the Data")
  }
  
})

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
