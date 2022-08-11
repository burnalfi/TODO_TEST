import cors from "cors";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { activityRouter, todoRouter } from "./controllers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express()


function main() {
    try {
        const port = parseInt(process.env["API_URL"].split(":")[2]);
        const host = String(process.env["API_URL"].split(":")[1].split("//")[0]);
        console.log(`Establishing connection using port ${port}...`);
        
        app.use(bodyParser.json());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use("/activity-groups", activityRouter);
        app.use("/todo-items", todoRouter);
        
        const server = http.createServer(app);
        server.listen(port, host);
        console.log("Connection established!");
    } catch (e) {
        console.error(e);
        console.error(e.message);
        throw new Error(e.message);
    }
}

main();

app.get("/", (_req, res) => {
    res.status(200).send("Hello World!")
})