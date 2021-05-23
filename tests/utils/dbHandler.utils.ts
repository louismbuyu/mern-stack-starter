const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

exports.dbConnect = async () => {
    const uri = await mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};

exports.dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};