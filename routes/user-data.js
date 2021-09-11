require('dotenv').config()
const express = require('express');
const router = express.Router();
const conn = require('../database');

router.post('/getMovie', async(req, res) => {
    console.log(req.body);
    conn.query(`SELECT * FROM user_movie ud WHERE ud.id_movie = ${req.body.id_movie} AND ud.id_user = ${req.body.id_user}`, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
    });
});
router.post('/addMovie', async(req, res) => {
    conn.query(`INSERT INTO user_movie SET ? `,[req.body], (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
    });
});
module.exports = router;