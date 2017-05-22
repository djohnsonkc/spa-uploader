let express = require('express'),
    app = express(),
    compression = require('compression'),
    busboy = require('connect-busboy'),
    processor = require('./lib/processor'),
    port = process.env.PORT || 3000

app.use(compression())

// file uploads
app.use(busboy());

//app.use(express.static(__dirname + '/public')); //dont cache while testing app
//use maxAge to enable caching by the client
let one_day = 86400000 //or 24 * 60 * 60 * 1000
let thirty_days = 2592000000
app.use(express.static(__dirname + '/public', { maxAge: thirty_days })) //using 30 days gets a better YSlow score

// serves the home page
app.get("/", (req, res) => {
    //serve the minified file
    res.sendFile(__dirname + '/public/html/dist/index.html')
    //res.sendFile(__dirname + '/public/html/index.html')
});

// serves requests to upload files
app.post('/v1/files', (req, res) => {
    processor.upload(req, function(err, results) {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(results)
        }
    })
});


app.listen(port, function () {
    //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
    console.log("Express server listening on port " + port)
})