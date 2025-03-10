const express = require('express')
const app = express()
const port = 3001

var redis = require('redis');
var client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client); 

app.get('/jobs', async (req, res) =>{

    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(jobs)

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}!`))