// Place your server entry point code here

const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const morgan = require('morgan')
const db = require('./database.js')
const coin = require('./coin.js')

// Serve static HTML files
app.use(express.static('./public'));

// make express use built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

args['port', 'debug', 'log', 'help']

// print help message
const help = (`server.js [options]
    
    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.
    
    --debug	If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                false.
    
    --log	If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
    
    --help	Return this message and exit.`)

if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// server port
const port = args.port || process.env.PORT || 5555
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})


// API endpoints
app.get('/app/', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' })
    res.end(res.statusCode + ' ' + res.statusMessage)
})

// logging middleware
app.use(require('./src/middleware/mymiddleware.js'))

// log and error testing
if (args.debug == true) {
    // create endpoint /app/log/access that returns accesslog
    app.use(require('./src/routes/debug'))
}

// log == true
if (args.log == true) {
    const logstream = fs.createWriteStream('./access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: logstream }))
}

app.use(function(req, res){
	res.json({"message": "Endpoint not found. (404)"});
    res.status(404);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server stopped')
    })
})