require('dotenv').config();
require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/${req.params.productId}`)
    .then((res) => {
    	console.log(res);
      return res.json();
    })
    .then(json => res.send(json));
});

app.post('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/new`, {
  	method: 'POST'
  })
    .then((res) => {
      // do nothing
    })
    .then(json => res.status(202).send());
});

// sonia

app.get('/product', (req, res) => { //will be sent to my component 
  // client.get(req.query.id, function(err, data) {
  //   console.log("here~")
  //   if (err) throw err;
  //   if (data != null) {
  //       console.log("hit not null")
  //       console.log(typeof JSON.parse(data));
  //       res.send({"data": JSON.parse(data).rows});
  //   } else {
    fetch(`http://ec2-52-53-250-252.us-west-1.compute.amazonaws.com:4043/product/?id=${req.query.id}`) //will proxy to my component server 
      .then((res) => {
        return res.json();
      })
      .then(json => res.send(JSON.stringify(json)));
   //}
  })

// michelle

app.get('/get', (req, res) => {
  fetch(`http://ec2-54-153-66-98.us-west-1.compute.amazonaws.com:9001/get/?id=${req.query.id}`)
    .then(response => {
      return response.json()
    }).then(json => {
      res.send(json)
    })
    .catch(err => console.log(err))
});

// matt

app.get('/api/checkout/:productId', (req, res) => {
  fetch(`http://localhost:7777/checkout/${req.params.productId}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(json));
});
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}...`);
});


