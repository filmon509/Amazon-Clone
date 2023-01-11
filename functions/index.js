const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors');
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51MJS2SF6A9kZjEN2Eviv891xIakpgJkSyDzGGszYucyZLVhOyWQqxWfTC1qxqQNaQB28D2Sa2NKgLdWQcrQffktN00yOwrVUCA");

// app config
const app = express();
// middlewares
app.use(cors({ origin: true }));
app.use(express.json());


app.get('/',(request,response)=> response.status(200).send('Hello World'))


app.post('/payment/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Recieved for this amount >>>>>>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: 'usd',
    })
    // ok - created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

// listen command
exports.api = functions.https.onRequest(app);


// http://127.0.0.1:5001/clone-3be3
// b/us-central1/api
