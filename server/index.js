const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const createError = require('./utils/appError'); // Correct import

const app = express();

//1>Middlewares
app.use(cors());
app.use(express.json());

//2>Route
app.use('/api/auth', authRouter);

//3>mongodb Connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
  .then(() => console.log("connected to Mongodb"))
  .catch((err) => console.log('failed to connect', err));

//4>Global Error handler
app.use((err, req, res, next) => {  // Correct parameter order
    err.statusCode = err.statusCode || 500; // Correct typo
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//5>Server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
