const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profileId = require('./controllers/profileId')
const imageCount = require('./controllers/imageCount')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'nine1992',
      database : 'smart-brain'
    }
  });  

const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => res.json(database.users))

app.post('/signin', (req,res) => signin.handleSignIn(db, bcrypt)(req, res))

app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req,res) => profileId.handleProfileId(req, res, db))

app.put('/image', (req,res) => imageCount.handleImageCount(req, res, db))

app.post('/imageUrl', (req,res) => imageCount.handleApiCall(req, res))




app.listen(5000, () => {
    console.log('app is running on port: 5000')
})



