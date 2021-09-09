require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios').default;

let themoviedb = "https://api.themoviedb.org/3/";

router.post('/movieByID', async(req, res) => {
    await axios.get(themoviedb + "movie/" + req.body.id,{
        params :{
            api_key :process.env.TMDB_API_KEY
        }
    })
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results.data));
    }).catch(err=>{
        console.error('err',err);
    })
});
router.post('/movieImagesByID', async(req, res) => {
    await axios.get(themoviedb + "movie/" + req.body.id + "/images",{
        params :{
            api_key :process.env.TMDB_API_KEY
        }
    })
    .then(results=>{
        console.log(results);
        res.send(JSON.stringify(results.data));
    }).catch(err=>{
        console.error('err',err);
    })
});
module.exports = router;