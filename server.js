const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// tell mongoose which database we want to connect to
// if the environment variable MONGODB_URI exists, like on Heroku, it will be used
// else default to mongodb://localhost/pizza-hunt, the local MongoDB server's database
//
// MongoDB will automatically find and connect to the database(in this case pizza-hunt) if it exists or create the dataase if it doesn't
mongoose.connect(process.env.MONGODB_URI || 'mongodb://rootytooty:WaNg1934@cluster0.s7fq4.mongodb.net/pizza_hunt_db?retryWrites=true&w=majority', {
    // the 2nd arguement is a set of confirguration options mongoose asks for more information about
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
