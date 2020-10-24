const https = require("https");

const demoCallApi = () => {
  return https
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        //console.log(JSON.parse(data).explanation);
        return JSON.parse(data).explanation;
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};
module.exports = { demoCallApi };
