const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
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

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Home",
        stylesheet: "index"
    });
});