const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vrn', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('database connection succesfully')
    } catch (error) {
        console.error('database connection error- ',error.message);
        throw error;
    }
}