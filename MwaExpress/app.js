const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const movieRouter = require('./router/movie');
const reviewRouter = require('./router/review');
const userRouter = require('./router/user');
const loginRouter = require('./router/login');
const movieManagerRouter = require('./router/movie-manager');
const jwt = require('./commons/jwt');
const settings = require('./hidden');
const User = require('./model/userModel');

const app = express();
mongoose.connect(settings.mongodb.connectionstring).then(result => {
     console.log("mongo ok");
     User.initAdminUser();
}).catch(err => {
     console.log(err);
});

const html = __dirname + '/public/';

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(html));

app.use('/api/movie', movieRouter);
app.use('/api/review', reviewRouter);
app.use('/api/user', jwt(['admin']), userRouter);
app.use('/api/login', loginRouter);
app.use('/api/movie-manager', jwt(['admin']), movieManagerRouter);

app.get('*', (req, res) => {
     res.sendFile(html + 'index.html');
});

app.listen(3000, () => {
     console.log('Good Luck');
});
