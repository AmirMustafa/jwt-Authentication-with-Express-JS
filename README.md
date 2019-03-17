# jwt Authenication API with Express using POSTMAN

Here we will generate a token first using <b>/api/login route </b> which will expire after 160 seconds.<br> So next we will use this token using <b>/api/posts route </b> plus passing <b>Authorization bearer token </b>in the <b>header</b> of the Postman<br>

## Installation
1. Install Express dependency: npm install express
2. Passport JS: npm install express-passport
3. jwt Auth: npm install express -jwt

## Steps

1. Include above modules and writing a simple API (GET route) to check whether postman is working
```
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


```

<br>

2. Create token using jwt Auth and passing the sample user using POST route:
This token will expire wihin some time (here 160 seconds). So if you try to login after 160 seconds message of token expire/ fatal will show.

```
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
```

3. Login using POST Route

We will use /api/posts route plus we will pass : Authorization bearer token_generated in header

```

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

```

## Screenshots:

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494727-2e2be600-48ff-11e9-9592-bd5f6cbe6ddd.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494728-371cb780-48ff-11e9-95e8-5be370932fa4.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494731-3dab2f00-48ff-11e9-8c36-d24a6c910870.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494734-40a61f80-48ff-11e9-8f85-3e99d1f3df7e.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494736-47349700-48ff-11e9-8f91-9d0b02145435.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494739-4ac81e00-48ff-11e9-8bf5-46ab533db449.png?raw=true "Screenshot of JwtAuth API")

![Screenshot of jwt Auth API](https://user-images.githubusercontent.com/15896579/54494741-4dc30e80-48ff-11e9-9295-25b973f11f6e.png?raw=true "Screenshot of JwtAuth API")
