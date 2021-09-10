require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const tweetRouter = require('./routes/tweet');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection

// database
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected.'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRouter);
app.use('/tweets', tweetRouter);

app.listen(3000, () => console.log('Server running.'));
