const express = require("express");
const app = express();
const zod =require("zod");

const schema = zod.array(zod.number());

//for email
//password
//country either IND or US
//for these entity we can use zod object schema like this

const objectSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IND").or(zod.literal("US")),
}) 

app.use(express.json());

app.post("/health-checkup", function(req, res){
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    if(!response.success){
        res.status(401).json({
            err: "Invalid input"
        });
        return;
    }

    res.send({
        response
    })
});


app.listen(8009, function(req, res){
    console.log("Server is running on port 8009");
});
