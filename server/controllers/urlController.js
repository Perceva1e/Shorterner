const db = require('../models');
const shortid = require('shortid');
const { generateShareLink, generateStatsLink } = require('../utils/generateLinks');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = shortid.generate();

    const url = await db.urls.create({ originalUrl, shortCode });
    
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
    
    const url = await db.urls.findOne({ where: { shortCode } });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    
    await db.clicks.create({
      urlId: url.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer') || 'direct'
    });
    
    res.redirect(301, url.originalUrl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};