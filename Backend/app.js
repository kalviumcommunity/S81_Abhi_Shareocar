const express=require("express")
const ErrorMiddleware=require("./middleware/error")
const userRouter=require('./controllers/userRoutes')
require('./config/passport')
const app=express()
app.use(express.json())
const cors =require('cors')
app.use(cors())


app.use("/user",userRouter)



app.use(ErrorMiddleware)


module.exports = { app };