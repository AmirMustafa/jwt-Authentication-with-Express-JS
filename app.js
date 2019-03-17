// Added express and jwt auth modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Added invoked express 
const app = express();

// basic api to check response
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

// generate token of the user - at present added hardcoded user
app.post('/api/login', (req, res) => {
    // Test User
    const user = {
        id: 1,
        username: 'amir',
        email: 'amirengg15@gmail.com'
    }

    // passing data to jwt to generate token
    jwt.sign({user}, 'secretkey', {expiresIn: '160s'}, (err, token) => {    // expiry of token set to 160 seconds
        res.json ({
            token
        })
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            // res.sendStatus(403);
            res.status(403).send('token expired');
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.status(403).send('Data is forbidden');
        // res.sendStatus(403);
    }
}
port = 5000;
app.listen(port, () => console.log('Listening on port 5000'));