const express = require('express');
const router = express.Router();

//USER
const usersRoutes = require('./users')
router.use('/users',usersRoutes);
//OMDB
const themoviedb = require('./movies')
router.use('/movies',themoviedb);
 

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(token == null)return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = router;