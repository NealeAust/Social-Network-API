const { connect, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/social_network_api_db';

    connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    module.exports = connection

    