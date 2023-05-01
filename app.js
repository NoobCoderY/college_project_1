import  express  from "express";
const app =express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/UserRoutes.js"
import BinRouter from "./routes/BinRoutes.js"
import {error} from "./middleware/errorMiddleware.js";
import cors from "cors"


dotenv.config({
  path: "./config/config.env",
});
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())



app.use("/api/v1",UserRouter)
app.use("/api/v1",BinRouter)


app.use(error)
export default app;