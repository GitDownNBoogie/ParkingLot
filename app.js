const express = require('express');


const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {

    response.render('index', {title: 'Parking Lot'});
});

app.get('/history', (request, response) => {

    response.render('history');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

