require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    database: 'News',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect((err) => {
    if(err) return console.log(err);

    console.log('Database connected!');
});

function authJWT(req, res, next) {

    // Grab the token from the request header and remove the "Bearer" from the header (header is "Bearer [TOKEN]")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    // check if token exists
    if(token === null) return res.sendStatus(401);

    // Try to decrypt the token with env.ACCESS_TOKEN_SECRET
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        // check if token is valid
        if(err) return res.sendStatus(403);

        // return the decryted (from token with env.ACCESS_TOKEN_SECRET) user data and move on
        req.user = user;

        next();
    });
}

function getPermissions(user) {
    let perms = [];

    user.status.roles.forEach(r => {
        perms.push(...r.permissions);
    });

    return [...new Set(perms)];
}

app.get('/api/ping', authJWT, (req, res) => {
    console.log(req.user);
    res.status(200).send({message: 'Success!'});
});

app.post('/api/post', authJWT, (req, res) => {
    //if(!getPermissions(req.user).includes('MANAGE:POSTS')) return res.sendStatus(403);
    
    if(!req.body.title || !req.body.body || !req.body.tags) return res.status(400).json({message: 'Missing fields!'});

    db.query('INSERT INTO posts (title, body, tags, stats) VALUES (?, ?, ?, ?);', [req.body.title, req.body.body, req.body.tags, JSON.stringify({likes:0,views:0,comments:[]})], (err, results) => {

        if(err) return res.status(500).json({message: 'Failed to post.'});
        
        res.status(200).json({message: 'Success!'});

    });
});

app.get('/api/posts', authJWT, (req, res) => {
    //if(!getPermissions(req.user).includes('VIEW_POSTS')) return res.sendStatus(403);

    db.query('SELECT * FROM posts;', (err, results) => {
        
        if(err) return res.status(500).json({message: 'Failed to get posts.'});

        res.status(200).json(results);
    });
});

app.post('/api/tes', (req, res) => {
    console.log(req.body);
})

app.listen(process.env.API_PORT, () => console.log(`Listening on port ${process.env.API_PORT}`)); 