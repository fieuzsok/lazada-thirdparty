var { schema, root } = require('./app/output-schema/orders')
var { graphqlHTTP } = require('express-graphql');
const https = require("https");
const http = require("http");
const lazada_api_call = require("./lazada_api_call");
const express = require("express");
const bodyParser = require('body-parser');
var app = express();
var dbconnect = require('./app/controller/utils/mongoose-connection')
var accessToken = require('./app/controller/getAccessToken')
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


const orderGraph = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
});
app.use('/ordersGraphql', orderGraph);

server.listen(process.env.PORT||3000, () => {
  console.log("Server Start on 3000!!");
});
