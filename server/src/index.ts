import dotenv from "dotenv";
dotenv.config();

import server from "./app";

//TODO: We will connect to DB then to our server in future.

server.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
    
})