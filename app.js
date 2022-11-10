const express = require('express');
const app = express();
const cors = require('cors');


const userRoute = require('./routes/user.route');


app.use(express.json());
app.use(cors());


app.use('/api/v1/user', userRoute);



app.get("/", (req, res)=>{
    res.send("Wellcome to E-Mart server. All routes are working.")
});

app.all("*", (req, res)=> {
    res.send("Opps...No Route Found.")
});

module.exports = app;