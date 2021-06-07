const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routes = require('./routes/router');
var session = require("express-session");


app.engine('hbs', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/hbs-helpers.js')
}));

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));



app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))


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

app.set('view engine', 'hbs');
app.use('/', routes);
