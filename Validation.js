const express = require("express");
const app = express();

app.use(express.json());

app.post("/health-checkup", function(req, res){
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;

    res.send({
        msg: "your kidney length is " 
    });

   
});

//global catches all errors
app.use(function(err, req, res, next){
    res.json({
        msg: "something went wrong!"
    });
});

app.listen(8008);
