const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const Complaint = require('./models/complaint.js')

const app = express();

app.use(helmet());
app.use(
    session({
        secret: 'vfsdemo-session',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: 'auto',
        },
    })
);
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: 1024 * 1024 * 20,
        type: 'application/x-www-form-urlencoded',
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/vfsdemo');

app.listen(3002 || process.env.PORT, () => {
    console.log("Server running on port 3002");
});

app.get("/", (req, res, next) => {
    req.sendFile('index.html');
});

app.get("/test", (req, res, next) => {
    res.json({ 'test': 'Test of Simple GET' });
});

app.post('/', (req, res, next) => {
    const newComplaint = new Complaint({
        date: new Date(),
        contact: req.body.contact,
        complaint: req.body.complaint,
        comment: req.body.comment,
    })
    newComplaint.save((err, result) => {
        if (err) { 
            console.log(err); 
        } else { 
            res.json(result); 
        }
    });
});

app.get('/complaints', (req, res, next) => {
    Complaint.find((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});
