const mongoose = require('mongoose');
const config = require('config');   //To access the global variables
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.log(err);
        process.exit(1);    //Exit with the failure
    }
}

module.exports = connectDB;