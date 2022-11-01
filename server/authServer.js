require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'zeitung.schule.cool@gmail.com',
        pass: 'oouwhmomjzyryhlp'
    }
});

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

app.use(express.json());
app.use(require('cors')());

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

/*
    TODO: Store the refresh tokens in a database in production
*/
let refreshTokens = [];

app.post('/auth/token', (req, res) => {

    // Get the refresh token and check if it exists
    const refreshToken = req.body.token;

    if(refreshToken === null) return res.sendStatus(401);

    // check if the server has the same refresh token stored / if the refresh token is valid
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        delete user.iat;

        // Generate the new access token
        const token = generateAccessToken(user);
        res.json({ token });
    });
});

app.delete('/auth/logout', (req, res) => {
    // Remove the logged out users refresh token from our list and then send success response (204 = Deleted successfully)
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

app.post('/auth/login', (req, res) => {
    // Authenticate the user
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if(err) return res.sendStatus(500);

        let result = results[0];
        
        if(!result || result.password === undefined) res.json({ err: 'User doesn\'t exist!', auth: false });

        bcrypt.compare(password, result.password).then((match) => {

            if(!match) return res.json({err:'Wrong Password', auth: false});

            // Get all the user data and put it into one Objet to encrypt
            const username = req.body.username;
            const user = { username };

            result = JSON.parse(JSON.stringify(result));

            result.status = JSON.parse(result.status);

            const accessToken = generateAccessToken(result);
            const refreshToken = jwt.sign(result, process.env.REFRESH_TOKEN_SECRET);

            refreshTokens.push(refreshToken);

            res.json({ accessToken, refreshToken, auth: true, user: result });

        });

    });

});

let emailCodes = [];

app.post('/auth/register', (req, res) => {
    
    const email = req.body.email,
        password = req.body.password;

    if(!email || !password) return res.json({err: 'Email or Password missig.'});
    if(!email.endsWith("@edu.sbl.ch")) return res.json({err: 'Email not accepted!'});

    if(!req.body.code) {

        let code = Math.floor(Math.random() * (999999 - 111111 + 1) + 111111)

        transporter.sendMail({
            from: 'zeitung.zeitung.cool@gmail.com',
            to: email,
            subject: 'Bestätigungs Code',
            html: `<h3>Ihr code lautet: </h3><h1>${code}</h1>`
        }, (error, info) => {
            if (error) return res.json({err: 'Failed to send Mail'});
            emailCodes.push({
                email,
                code,
                iot: Date.now()
            });
            return res.json({res: 'Verification code sent'});
        });

        return res.json({res: 'Sending verification code'});
    }

    if(!emailCodes.find(e => e.email == email && e.code == req.body.code)) return res.json({err: 'Wrong verification code'});

    emailCodes.splice(emailCodes.findIndex(e => e.email == email), 1);
    
    db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if(!results[0]) return res.json({err: 'User already exists'});

        bcrypt.hash(password, 10, (err, hash) => {
            db.query('INSERT INTO users (email, password, status) VALUES (?, ?, ?);', 
            [email, hash, JSON.stringify({ roles: [ { name: 'STUDENT', permissions: ['VIEW:POSTS', 'VIEW:RUBRIKEN'] } ], score:0, badges: [] })], (err, results) => {
                if(err) return res.sendStatus(500);
    
                res.statusCode(200).json({res:'Registered'});
            });
        });
    });


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

app.get('/auth/check', authJWT, (req, res) => {
    db.query('SELECT * FROM users WHERE email = ?;', [req.user.email], (err, results) => {
        if(err) return res.sendStatus(500);

        let result = JSON.parse(JSON.stringify(results[0]));

        result.status = JSON.parse(result.status);

        res.json({
            auth: true,
            user: result
        });
    });
});

function generateAccessToken(user) {
    // Encrypt the data (user, password) with the env.ACCESS_TOKEN_SECRET and return the token

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" });
}

app.listen(process.env.AUTH_PORT, () => console.log(`Listening on port ${process.env.AUTH_PORT}`)); 