const express = require('express');
const app = express();
const path = require('path');

// Custom middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};


// Set up static file serving
app.use(express.static('public'));

// Set up views directory for Pug templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up routes
app.get('/', checkWorkingHours, (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
