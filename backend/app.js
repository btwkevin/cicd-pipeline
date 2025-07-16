import http from 'node:http'
import { createReadStream } from 'node:fs'

const server = http.createServer(async (req, res) => {
    if (req.url == '/' || req.url == '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const readStream = createReadStream('frontend/index.html')
        readStream.pipe(res)
    }
    else {
        const file = ['/script.js', '/style.css']
        if (file.includes(req.url)) {
            const readStream = createReadStream(`frontend${req.url}`)
            readStream.on('error', (err) => {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ err: 'file not found' }))
            })
            readStream.pipe(res)
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ err: '404 page not found' }))
        }
    }
})
server.listen(8080, () => console.log('server listen : 8080'))
