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

    
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())
    app.use(express.static('public'))
    



    
    app.get('/', (req,res) => {
        db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs',{quotes: results})
            })
            .catch(error => console.error(error))
    });
    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    });
    app.put('/quotes',(req,res) => {
        quotesCollection.findOneAndUpdate(
            {name: req.body.update},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                }
            },
            {
                upsert: true,
            }
        )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
    })

    app.delete('/specific-quote', (req,res) => {
        quotesCollection.deleteOne(
            {
                name: req.body.authorS,
                quote: req.body.quoteS,
            }
        )
        .then(result => {
            res.json('Deleted specific quote')
        })
        .catch(error => console.error(error))
    })

    app.delete('/delete-all-matches', (req,res) => {
        quotesCollection.deleteMany(
            {name:req.body.name},
        )
        .then(result => {
            res.json('Deleted all quotes by target author')
        })
        .catch(err => {
            console.error(err)
        })
    })

    app.listen(3000, function() { // Creates server
        console.log('listening on 3000')
    });

})






