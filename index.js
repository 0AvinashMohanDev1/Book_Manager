const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cors=require("cors");
const logger = require('./middlewares/logger');
const swaggerDocs=require("./helpers/swagger");

const app = express();
const PORT = 3000;
app.use(cors()); 


// Middleware
app.use(express.json());
app.use(swaggerDocs);
app.use(logger);

// Routes
app.get("/",(req,res)=>{
    res.send("Book Management API");
})
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, async() => {
  try {
    // Connect to MongoDB
    await connectDB; 
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log({error});
  }
});
