require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db")();

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("./client/build"));

app.use("/api/", require("./api/index"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));