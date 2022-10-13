const http = require('http');
const fs = require('fs');

function rqListener(req, res){
    console.log(req)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('argHeader', 123)

    if(req.url == '/message' || req.url == '/message?'){
        if(req.method == 'GET'){
            return res.end('<h1>Hello from my Node.js server!</h1>')
        }else if(req.method == 'POST'){
            fs.writeFileSync('message.txt', "DUMMY");
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        }
    }
    res.write('<form action="/message" method="POST">');
    res.write("<input />")
    res.write('<button type="submit">Message</button>')
    res.write('</form>')
    res.end('');
}

const server = http.createServer(rqListener);

server.listen(3000)