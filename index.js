const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

//_________________________________________________________________________________

const app = express();
dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Sucess , Server Running at Port ${process.env.PORT}`);
        })
    })
    .catch(() => {
        console.log("Unable to Connect to Server");
    })

//_____________________________________________________________________________________

app.use('/', require('./routes/userRoute.js'))

app.use('*', (req, res) => {
    res.send("Error, Nothing Found")
})

app.use((err, req, res, next) => {
    console.log(err.name);
    console.log(err)
    next(err);
})
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})