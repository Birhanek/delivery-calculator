import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";

// user defined imports
import development  from "./config/development";
import router from "./routes/delivery.router";
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:'*'
}))

app.use('/',router)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    return res.status(500).json({
        message:err.message,
        status: 500
    })
})


app.listen(development.app.SERVER_PORT,()=>{
    console.log(`The application is connected on port ${development.app.SERVER_PORT} with http://localhost:${development.app.SERVER_PORT}`)
})




