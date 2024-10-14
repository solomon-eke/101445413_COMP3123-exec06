const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Note = require('./models/noteModel')
const port = 3001;


const noteRoute = require("./routes/Note");


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/notes', noteRoute);






mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://mongo:mongo@mycluster.haof1.mongodb.net/Wk06?retryWrites=true&w=majority&appName=MyCluster')
.then(() => {
    console.log('connected to mongoDB');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}).catch((error) =>{

    console.log(error);

})

