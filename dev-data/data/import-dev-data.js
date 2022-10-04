const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });

// IMPORT MODEL
const Tour = require('../../models/tourModels');
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

const tours = JSON.parse(fs.readFileSync('./tours.json', 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Successfully Loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
