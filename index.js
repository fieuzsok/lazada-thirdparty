const https = require("https");
const http = require("http");
const lazada_api_call = require("./lazada_api_call");
const express = require("express");
const bodyParser = require('body-parser');
var app = express();
var dbconnect = require('./app/controller/utils/mongoose-connection')
var accessToken = require('./app/controller/getAccessToken')
const orders = require('./app/controller/OrdersManagement')
app.use(bodyParser.json());
var server = http.createServer(app);


app.get("/", (req, res) => {
  //res.send(req);
  var result = lazada_api_call.demoCallApi();
  console.log(req.query)
  res.send(result);
});

//URL CAll BACK
app.get(
  '/getCodeAccessToken',
  (req,res) => {
    if(req.query && req.query.code)
   {
    dbconnect.dbconnect();
    accessToken.getAccessToken(req.query.code);

    console.log(req.query.code)
    res.send(req.query.code);
   } 
  }
)

// function get UserToken
app.get(
  '/orders',
  (req,res) => {
    dbconnect.dbconnect();
    orders.getOrders('testdeco02@mailinator.com', { created_after: '2017-02-10', update_after: '2017-02-10' }).then((value)=>{
      res.send(value)
    });
  }
)


server.listen(process.env.PORT||3000, () => {
  console.log("Server Start on 3000!!");
});
