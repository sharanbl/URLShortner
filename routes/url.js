const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');
const { base } = require('../models/Url');

//Handling POST request to /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    //Checking if the baseUrl is valid
    if(!validUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid base url');
    }

    const urlCode = shortid.generate();

    //Checking if the longUrl is valid
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if(url){
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch(err){
            console.log(err);
            //res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid long Url');
    }

});

module.exports = router;