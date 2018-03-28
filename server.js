const express = require('express');
const hbs = require('hbs'); // handlebars js
const fs = require('fs');

var app = express();

// add support for partials
hbs.registerPartials(__dirname + '/views/partials'); //similar to include like php



//middleware
app.set('view engine', 'hbs');

// express middleware
app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`; 
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err) {
            console.log('Unable to connect to server');
        }
    });
    next(); // it's essential
});

//maintenance mood
/* app.use((req, res) => {
    res.render('maintenance.hbs');
});
 */
app.use(express.static(__dirname + '/public')); //dirname has the default path of the directory ---> middleware




//registering Helper for partials
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


//route
app.get('/', (req, res) => {
   res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to the best website using nodeJS',
    });

     //res.send('<h1>Hello Express!</h1>');
   /*  res.send({
        name: 'Andrew',
        likes: [
            'biking', 'food', 'travel'
        ]
    }); */
}); //register handler

app.get('/about', (req, res)=> {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

//example


//bad
app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: 'Unable to fullfill the request'
    });
})

//bind app to port
app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
});