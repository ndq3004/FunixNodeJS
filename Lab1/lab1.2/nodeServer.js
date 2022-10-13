const http = require('http');

function rqListener(req, res){
    console.log(req)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('argHeader', 123)

    // if(req.url == '/message'){
    //     res.write('<form action="POST"><button type="submit">Message</button></form>')
    // }

    res.write("<h1>Hello from my Node.js server!</h1>");
    res.write("<h1>")
    res.write("<input />")
    res.write('<button onclick="location.href="//message"">Message</button>')
    res.write("</h1>")
    res.end('ok');
}

const server = http.createServer(rqListener);

server.listen(3000)