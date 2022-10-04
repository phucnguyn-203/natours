const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception, Shutting down server...');
    process.exit(1);
});

const app = require('./app');

// DATABASE CONNECTION
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connection successful!'));

//START SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandle Rejection, Shutting down server');
    server.close(() => {
        process.exit(1);
    });
});
