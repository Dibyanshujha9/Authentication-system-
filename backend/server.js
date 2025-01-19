// import dotenv from 'dotenv';
// dotenv.config()

// in ES 6 
import 'dotenv/config.js'
import http from 'http';
import app from './app.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}) 