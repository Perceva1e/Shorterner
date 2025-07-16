const db = require('../models');
const shortid = require('shortid');
const { generateShareLink, generateStatsLink } = require('../utils/generateLinks');
const UAParser = require('ua-parser-js');
const axios = require('axios');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = shortid.generate();

    const url = await db.Url.create({ originalUrl, shortCode });
    
    const shareLink = generateShareLink(req, shortCode);
    const statsLink = generateStatsLink(req, shortCode);
    
    res.status(201).json({ shareLink, statsLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await db.Url.findOne({ where: { shortCode } });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    
    const parser = new UAParser();
    const uaResult = parser.setUA(req.get('User-Agent')).getResult();
    
    const ip = req.ip === '::1' ? '8.8.8.8' : req.ip; 
    let region = 'Unknown';
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = response.data;
      region = data.error ? 'Unknown' : `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
    } catch (err) {
      console.error('Error fetching geolocation:', err.message);
    }
    
    await db.Click.create({
      urlId: url.id,
      ipAddress: ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer') || 'direct',
      region,
      browser: uaResult.browser.name || 'Unknown',
      browserVersion: uaResult.browser.version || 'Unknown',
      os: uaResult.os.name || 'Unknown',
      deviceType: uaResult.device.type || 'desktop' 
    });
    
    res.redirect(301, url.originalUrl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};