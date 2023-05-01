import app from "./app.js";
import {connectDb} from "./config/dbConnection.js"

connectDb();

app.listen(process.env.PORT,()=>{
    console.log("connected",process.env.PORT);
})