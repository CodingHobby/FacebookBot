'use strict'

const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

// Index route
app.get('/', function(req, res) {
  res.send('Hello world, I am a chat bot')
})

// for Facebook verification
// Process application/json
app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})

app.post('/webhook/', function(req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
    }
  }
  res.sendStatus(200)
})

const token = "EAAE7IZCRTbWQBADm7pq9DtCP54YtghZAhrqP86haxlP0HhrThquZChCk1DghqNQog9Xg3GPoJnUm6SWYzvWCX6TpBODrZBmZBXGS58VlftDvtZBfQWq7LmZAM4DokNcPSTxM68gPs6bZB60aY7GQeAtJQlLNpZCK1iZC0pxZBzTYAG9yQZDZD"
