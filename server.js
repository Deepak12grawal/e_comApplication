//this will be the starting file of the project

const express=require("express");
const mongoose=require("mongoose");
const app=express()
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")
const user_model=require("./models/user.models");
const bcrypt=require("bcryptjs")
/**
 * create an admin user at the starting of the application
 * if not already present
 */       

//connection with mongodb
mongoose.connect(db_config.DB_URL);
const db=mongoose.connection


db.on("error",()=>{
    console.log("error while connectong to the mongodb")
})
db.once("open",()=>{
    console.log("connected to mongo db");
    init()
})

async function init(){
    let user=await user_model.findOne({userid:"admin"})
    if(user){
        console.log("admin is already present")
        return
    }
    try{
        user=await user_model.create({
            name:"deepak",
            userId:"admin",
            email:"agrawaldeepak017@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("deepak",8)
        })
        console.log("admin created" ,user)

    }catch(err){
        console.log("error while creating admin",err)
    }
}


//start the server
app.listen(server_config.PORT,()=>{
    console.log("server started at port number",server_config.PORT)
})