const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/index.html')
})
app.listen(process.env.PORT || 80,(error)=>{
    if (error){
        console.log('Something went wrong:',error);
    } else {
        console.log("Listening . . .")
    }
});