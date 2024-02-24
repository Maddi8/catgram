const express = require('express');
const pexel = require('pexels');
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;
const apiKey = "change_this"

const client = pexel.createClient(process.env.API_KEY || apiKey);
const query = 'Cat';

const app = express();
app.use(cors());

app.listen(port, () => {
    console.log("Server started on port:", port);
})

app.get("/getimages", (req, res) => {
    try {
        const pageNumber = Math.round(Math.random() * 1000);
        client.photos.search({ query, per_page: 12, orientation: "portrait", size: "medium", page: pageNumber }).then(photos => {
            res.send(photos);
        });
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})