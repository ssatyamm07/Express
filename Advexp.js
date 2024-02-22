const express = require('express');
const app = express();

app.get("/health-checkup", function(req, res){
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    if(username === "harkirat" && password === "pass"){
        if( kidneyId ==1 || kidneyId == 2){
            res.json({
                msg: "Your kidneys are fine!"
            });
        }
    }
    res.status(400).json({"msg":"something went wrong"});
});

app.listen(5000 ,function(req, res){
    console.log("sever is running on post 5000");
})
