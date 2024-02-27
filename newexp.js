const express = require('express');
const app = express();
app.use(express.json());

const users = [{
    name: "Satyam",
    kidneys: [{
        healthy: false,
    }]
}];

app.get("/", function(req, res) {
    const SatyamKidneys = users[0].kidneys; 
    const numberOfKidneys = SatyamKidneys.length;
    let numberOfHealthyKidneys = 0;

    for (let i = 0; i<SatyamKidneys.length; i++) {
        if (SatyamKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
        if (isHealthy === undefined || typeof isHealthy !== 'boolean') {
        return res.status(400).json({error: "isHealthy pty is missing"});
    }
    users[0].kidneys.push({
        healthy: isHealthy 
    });
    res.json({
        msg: "Done!"
    });
});
app.put("/", function(req, res){
    for( let i =0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "Done!"
    });
});

app.delete("/", function(req, res){
    if (isThereAtlLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {  // there is some logical error in this code in delete section
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ msg: "Done!" });
    } else {
        res.status(400).json({ error: "No healthy kidneys found" });
    }

})

function isThereAtlLeastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return false;
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
