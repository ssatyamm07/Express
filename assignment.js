const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

const ALL_USERS = [{
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
},
{
    username: "rmana@gmail.com",
    password: "123321",
    name: "raman singh",
},
{
    username: "priya@gmail.com",
    password: "123321",
    name: "priya singh",
}];

function userExists(username, password){
    let userExists = false;
     for (let i = 0; i < ALL_USERS.length; i++){
         if (ALL_USERS[i].username == username && ALL_USERS[i].password == password){
             userExists = true;
             break;
         }
    }
    return userExists;
}

app.use(express.json());

        app.post("/signin", function(req, res){
            const username = req.body.username;
            const password = req.body.password;

        if (!userExists(username, password)){
            return res.status(403).json({
                message: " User does not exist in the database"

            });
        }

        var token = jwt.sign({ username: username }, jwtPassword);
        res.json({
            token,

    });

    
});

app.get("/users", function(req, res){
    const token = req.headers.authorization;
    try{
        const decode = jwt.verify(token, jwtPassword);
        const username = decode.username;
    
    res.json({
        username: username,
    }); 
}
    catch (err){
        res.status(403).json({
            message: "Invalid token",
        });
    }
});

app.listen(8088, function(){
    console.log("Server is running at port 8088");
});
