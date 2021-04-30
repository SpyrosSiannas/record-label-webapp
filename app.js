const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/index.html', (req, res, next)=>{
    res.sendFile(__dirname + '/index.html')
})
app.listen(process.env.PORT,(error)=>{
    if (error){
        console.log('Something went wrong:',error);
    }
});