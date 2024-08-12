const express=require("express");
const dotenv=require("dotenv");
const connection = require("./database/db");
const cors=require("cors");
const morgan=require("morgan");
const app=express();
const banner=require("./routes/index")


dotenv.config(); 

app.use(express.static('uploads'));

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use("/banner", banner);
 
const PORT=28126 || process.env.PORT
app.listen(`${PORT}`,()=>{
    console.log("server listening on port 28126");
})
