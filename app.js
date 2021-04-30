const http = require("http");
const fs = require('fs')
const port = 80;

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', (error, data) => {
        if (error){
            res.writeHead(404);
            res.write("File not found!");
        } else {
            res.write(data);
        }
        res.end();
    })
})

server.listen(process.env.PORT,(error)=>{
    if (error){
        console.log('Something went wrong:',error);
    } else {
        console.log('Server is listening on port ' + port)
    }
});