const https = require("https");
const http = require("http");
const lazada_api_call = require("./lazada_api_call");
const express = require("express");
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var server = http.createServer(app);
app.get("/", (req, res) => {
  //res.send(req);
  var result = lazada_api_call.demoCallApi();
  res.send(result);
});

app.post(
  '/getAccessToken',
  (req,res) => {
    console.log(`statusCode: ${req.statusCode}`)
    if(req.body)
   {
    console.log(req.body)
    res.send(req.body);
   } 
  }
)

server.listen(process.env.PORT||3000, () => {
  console.log("Server Start on 3000!!");
});
