const express = require('express');
const reload = require('reload')
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/hbs-helpers.js')
}));

app.use(express.static(__dirname + '/public'));
/** Heroku has the environment variable set 
    but the way we locally run the server, we don't
    so we set our local port to 80 and the heroku one
    to the environment it's running
*/
app.listen(process.env.PORT || 80, (error)=>{
    if (error){
        console.log('Something went wrong:', error);
    } else {
        console.log("Listening . . .")
    }
});
reload(app);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Home",
        src: "index"
    });
});

app.get('/artists', (req, res) => {
    res.render('artists', {
        layout: 'main',
        title:"Our Artists",
        src: "artists",
    });
});

app.get('/merch', (req,res) => {
    res.render('merch', {
        layout: "main",
        title:"Merchandise",
        src:"merch"
    });
});

app.get('/events', (req,res) => {
    res.render('events', {
        layout: 'main',
        title: "Events",
        src: "events"
    })
})