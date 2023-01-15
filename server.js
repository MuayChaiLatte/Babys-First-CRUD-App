const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://jeyashokkumaar:j84M2kU5J3nXnc4@cluster0.qghekwg.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(url, {useUnifiedTopology: true}, (err,client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({extended: true}));
    app.listen(3000, function() { // Creates server
        console.log('listening on 3000')
    });
    app.get('/', (req,res) => {
        res.sendFile(__dirname + '/index.html')
    });
    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    });

})





