const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const User = require("./user");
const API_PORT = 3001;
const app = express();
const bcrypt = require("bcryptjs");
const router = express.Router();
const dbRoute = "mongodb+srv://<db_username>:<db_password>@backlayer-61zpx.mongodb.net/test?retryWrites=true&w=majority";

app.use(cors());
mongoose.connect(dbRoute, { dbName: "backlayer" });

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));// app.use(logger("dev"));
app.use(logger("dev"));
// app.use((req, res, next) => {
//     next();
// });

returnError = (res, err) => {
    console.log("ERR: ", err)
    return res.send({ success: false, error: err });
}

router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({'email': email}).then((user, err) => {
        if (err) {returnError(res, err);}
        if (user && bcrypt.compareSync(password, user.password)) {
            return res.send({success: true});
        } else {
            returnError(res, "Email and/or password is incorrect");
        }
    });
});
router.get("/get_data", (req, res) => {
    Data.find((err, data) => {
        if (err) returnError(res, err);
        return res.send({ success: true, data: data });
    });
})

// append /api for our http requests
app.use("/api", router);
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
