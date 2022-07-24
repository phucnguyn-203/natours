const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

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
    .then(() => console.log('Database connection successful!'))
    .catch((err) => console.log(err));

//START SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
