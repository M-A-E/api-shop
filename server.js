const express = require("express");
const route = require("./src/routes");
const app = express();
require("dotenv").config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        statusCode: 200,
        message: "hallo world"
    })
})

app.use("/api/v1", route)

app.listen(port, () => console.log(`Running on ${host}:${port}`))