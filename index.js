    const http = require('node:http');
    const path = require('node:path');
    const fs = require('node:fs');
    const os = require('node:os');
    const url = require('node:url');

    const PORT = process.env.PORT || 8080;

    const server = http.createServer((req, res) => {
        let filePath = path.join(__dirname, 'public', req.url === '/' ? '/HTML/index.html' : req.url === '/about' ? '/HTML/about.html' : req.url === '/contact' ? '/HTML/contact.html' : req.url)

        let contentType = 'text/html';

        let extname = path.extname(filePath);

        //Check ext and change content type
        switch (extname) {
            case '.json':
                contentType = 'application/json'
                break;
            case '.js':
                contentType = 'text/javascript'
                break;
            case '.css':
                contentType = 'text/css'
                break;
            case '.txt':
                contentType = 'text/plain'
                break;
            case '.png':
                contentType = 'image/png'
                break;
            case '.jpg':
                contentType = 'image/jpg'
                break;
            default:
                break;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    //Page not found
                    fs.readFile(path.join(__dirname, 'public', 'HTML', '404.html'), (err, data) => {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(data, 'utf-8')
                    })
                }
                else {
                    //Some server error  
                    res.writeHead(500);
                    res.end(`Server error: ${err.code}`)
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data , 'utf-8');
            }
        })

    });
    server.listen(PORT, console.log(`Server running on port:${PORT}`))  