const http = require('http');

function rqListener(req, res){
    console.log(req)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('argHeader', 123)

    if(req.url == '/message' || req.url == '/message?'){
        return res.end('<h1>Hello from my Node.js server!</h1>')
    }
    res.write('<form action="/message" method="GET">');
    res.write("<input />")
    res.write('<button type="submit">Message</button>')
    res.write('</form>')
    res.end('');
}

const server = http.createServer(rqListener);

server.listen(3000)