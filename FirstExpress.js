const express = require('express');
function sum(n) {
    let ans = 0;
    for (i = 0; i <= n; i++) {
        ans = ans + i;
    }
    return ans;
}

const app = express();
app.get("/", function(req, res){
    const n = req.query.n;
    const ans = sum(n);
    res.send("this is the sum: " + ans);
});

app.listen(3005);