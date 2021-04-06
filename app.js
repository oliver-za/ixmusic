const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression")

const itemRoutes = require("./routes/items");
require("dotenv").config();

const app = express(); 


app.use(bodyParser.json()); 
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/audio", express.static(path.join(__dirname, "audio"))); 
 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Methods', 'GET'); 
  next();
});   
  

app.use("/items", itemRoutes); 

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;   
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(compression())
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err); 
    } 
  });
}); 
 

app.listen(PORT, console.log(`Server is running at port ${PORT}`));
