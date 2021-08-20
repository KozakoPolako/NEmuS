
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const corsOptions = {
    origin: 'https://localhost:3000'
}

app.use(cors());

app.use(express.static('games'));

app.get("/list", (req,res) => {

    fs.readdir("./games", (err,files) => {
        res.json(files);
        console.log(files);
        console.log(err);
    });
    //res.send("Print list on the server");

})



const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Express server running at ${host} : ${port}`);
});