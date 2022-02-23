const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require("./api/users/user.router");

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRouter); //main route



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});