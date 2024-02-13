const express = require('express');

const app = express();

app.get("/", function(req, res) {
    res.send("hey world");

})

app.listen(5000);