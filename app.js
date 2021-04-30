const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 80,(error)=>{
    if (error){
        console.log('Something went wrong:',error);
    } else {
        console.log("Listening . . .")
    }
});
app.engine('hbs', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main',
        title:"Coffestained Records",
        stylesheet: "index"
    });
});