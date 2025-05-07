const{app} = require("./app.js")
require("dotenv").config()
const connect=require("./db/connection.js")
const port=process.env.PORT



app.listen(port,async()=>{
    try{
        
        console.log(`app is running on http://localhost:${port}`)
        
       await connect
    }
    catch(err){
        console.log(err)
    }
    
 })