const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const express-validator = require("express-validator");
require('dotenv').config();

const app = express()

// import routes
const authRoutes = require('./routes/auth');
const truckRoutes = require('./routes/trucks')

//app middlewares
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(cors()); //allows all origins  or configure to restrict calls to certain domains

if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `http://localhost:3000`}))
}

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//middleware
app.use('/api', authRoutes);
app.use('/api', truckRoutes);

// Connect to the Mongo DB
// mongoose.connect(process.env.DATABASE, {
//     findAndModify: true,
//     useUnifiedTopology: false,
//     useNewUrlParser: true,
//     useCreateIndex: true 
// })
// .then(() => console.log('DB connected'))
// .catch(() => console.log('DB Connection Error', err));


mongoose.connect((process.env.MONGODB_URI || "mongodb://localhost/foodtrucks"), {
// mongoose.connect((process.env.DATABASE || "mongodb://localhost/foodtrucks"), {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true 
})
.then(() => console.log('DB connected'))
.catch(() => console.log('DB Connection Error', err));;

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
});

