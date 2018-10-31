require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const messagesCtrl = require('./messagesCtrl')
const session = require('express-session')

const app = express()

let {SERVER_PORT} = process.env

app.use(bodyParser.json())
app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
      let badWordsExist = true;
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });


app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/history', messagesCtrl.history)

app.listen(SERVER_PORT, ()=>{
    console.log(`Magic is happen' on port ${SERVER_PORT}`)
})