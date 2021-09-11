require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios').default;

let themoviedb = "https://api.themoviedb.org/3/";

router.post('/serieByID', async(req, res) => {
    await axios.get(themoviedb + "tv/" + req.body.id,{
        params :{
            api_key :process.env.TMDB_API_KEY
        }
    })
    .then(results=>{
        res.send(JSON.stringify(results.data));
    }).catch(err=>{
        console.error('err',err);
    })
});
router.post('/serieImagesByID', async(req, res) => {
    await axios.get(themoviedb + "tv/" + req.body.id + "/images",{
        params :{
            api_key :process.env.TMDB_API_KEY
        }
    })
    .then(results=>{
        res.send(JSON.stringify(results.data));
    }).catch(err=>{
        console.error('err',err);
    })
});
router.get('/popularSeries', async(req, res) => {
    await axios.get(themoviedb + "tv/popular",{
        params :{
            api_key :process.env.TMDB_API_KEY
        }
    })
    .then(results=>{
        res.send(JSON.stringify(results.data.results));
    }).catch(err=>{
        console.error('err',err);
    })
});
module.exports = router;