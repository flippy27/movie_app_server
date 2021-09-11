require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const conn = require('../database');

router.get('/', async(req, res) => {
    conn.query(`SELECT * FROM user `, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
    });
});


router.post('/register', async(req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const user = {name: req.body.username, email:req.body.email, password:hashedPassword};
    conn.query(`SELECT * FROM user `, (err, result) => {
        if (err) {console.error(err); res.send("error ingresando ususario");}
        let userfnd = result.find(user => user.user_email == req.body.email);
        if(userfnd != null)return res.send('User already exists with this email');
        data ={
            user_name:req.body.username,
            user_email: req.body.email,
            user_password: hashedPassword,
        }
        console.log('registering',data);
        conn.query('INSERT INTO user SET ?',[data],(err,results)=>{
            if(err){
                console.error(err);
                res.sendStatus(500).send('Couldnt add user');
            }else{
                res.send(results)
            }
        })
    });
});

router.post('/login', async(req, res) => {
    conn.query(`SELECT * FROM user `, async (err, result) => {
        let user = result.find(user => user.user_email == req.body.email);
        if(user == null){
            return res.status(400).send('Cannot find user');
        }
        try{
           if(await bcrypt.compare(req.body.password, user.user_password)){
               console.log('user',user);
               let jwtData = {
                   name:user.user_name,
                   email:user.user_email,
                   user_id:user.user_id,
               }
               console.log('data usuario',jwtData);
               const accessToken = jwt.sign(jwtData, process.env.ACCESS_TOKEN_SECRET)
               res.json({status:'Success',token:accessToken})
           }else{
               res.send('Not allowed');
           }
        }catch{
            res.status(500).send()
        }
    })
});


module.exports = router;