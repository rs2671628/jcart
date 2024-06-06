const express=require('express')
const cors=require('cors')
const connectDB=require('./config/db.js')
const router=require('./routes/index.js')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app=express()
app.use(cors({
    origin: ["https://https://jcart-ebfb.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)
const PORT=8080||process.env.PORT
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running")
    })
})
