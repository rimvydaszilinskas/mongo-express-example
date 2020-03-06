const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('dotenv').config({path: path.resolve(process.cwd(), '.env')});
const cityRoutes = require('./routes/cityRoutes');

const app = express();
const port = process.env.NODE_PORT || 3000;

mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'mydb'}/${process.env.MONGO_DB || 'mydb'}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (e) => {
    // If connection error occurs, print out the error and exit the process
    console.log(e);
    process.exit()
});

mongoose.connection.once('open', () => {
    app.emit('ready');
});

app.use(bodyParser.json());
app.use(expressValidator());

app.get('/', (_, res) => {
    return res.sendStatus(200);
});

app.use('/cities', cityRoutes());

app.on('ready', () => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
