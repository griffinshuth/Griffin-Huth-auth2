const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();


server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db('users')
    .insert(credentials)
    .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});
const jwtSecret = 'nobody tosses a dwarf!';
function generateToken(user){
    const jwtPayload = {
        ... user,
        hello: 'Griff',
        role:'admin'
    };
    const jwtOptions = {
        expiresIn: '30m',
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

server.post('/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({
        username: creds.username
    })
    .first()
.then(user => {
  if(user && bcrypt.compareSync(creds.password, user.password)) {
const token = generateToken(user);
    // found the user

res.status(200).json({ welcome: user.username, token });

  }else {
    res.status(401).json({ message: 'you shall not pass!' });
  }
})
.catch(err => res.status(500).json({ err }));
});

// protect this route, only authenticated users should see it
server.get('/users', protected, (req, res) => {
  // only if the device is logged in 
  console.log('\n** decoded token information **\n', req.decodedToken);
     db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));

  });

  function protected(req, res, next){
    const token = req.headers.authorization;

    if(token){
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'invalid token'});
      } else {
        req.decodedToken = decodedToken;
        next()
      }
    })
    }else {
      res.status(401).json({message: 'no token provided'})
    
 
}
  }

  function checkRole(role) {
    return function(req, res, next) {
      if(req.decodedToken && req.decodedToken.role.includes(role)){
        next()
      } else {
        res.status(403).json({message: 'you have no access'})
      }
    }
  }

server.listen(3300, () => console.log('\nrunning on port 3300\n'));

