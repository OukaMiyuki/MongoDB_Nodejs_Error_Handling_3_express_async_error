require('express-async-errors');
const error = require('./Middleware/error'); //calling the middleware function
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const auth = require('./Routes/auth');
const home = require('./Routes/home');
const manga = require('./Routes/manga');
const genre = require('./Routes/genre');
const userProfile = require('./Routes/userProfile');
const registerUser = require('./Routes/registerUser');
require('dotenv').config();

let key = process.env.jwtPrivateKey;
if(!key){
    console.error('Private Key is not defined!');
    process.exit(1);
}

const mongoDB = 'mongodb://localhost/mangaApp';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));

app.use(express.json());
app.use('/', home);
app.use('/api/manga', manga);
app.use('/api/genre', genre);
app.use('/api/user', userProfile);
app.use('/api/register', registerUser);
app.use('/api/auth', auth);

app.use(error); //the error middleware stored on the last
  
const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});