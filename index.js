import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { activityRouter, todoRouter } from "./controllers.js";

const app = express()


function main() {
    const port = 3030;
    console.log(`Establishing connection using port ${port}...`);
    app.listen(port);
    console.log("Connection established!");

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use("/activity-groups", activityRouter);
    app.use("/todo-items", todoRouter);
    console.log("Connected to server!");
    console.log(`App is running on http://127.0.0.1:${port}`);
}

main();

app.get("/", (_req, res) => {
    res.status(200).send("Hello World!")
})