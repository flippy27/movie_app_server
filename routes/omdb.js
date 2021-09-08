require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios').default;

let omdbUri = "http://www.omdbapi.com/";

router.post('/', async(req, res) => {
    await axios.get(omdbUri,{
        params:{
            i:req.body.id,
            apikey:process.env.OMDB_API_KEY
        }
    }).then(results=>{
        res.send(JSON.stringify(results.data));
    }).catch(err=>{
        console.error('err',err);
    })
});

module.exports = router;