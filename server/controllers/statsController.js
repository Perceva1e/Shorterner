const db = require('../models');

exports.getStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await db.Url.findOne({
      where: { shortCode },
      include: [{
        model: db.Click,
        as: 'clicks',
        attributes: [
          'ipAddress', 
          'region', 
          'browser',
          'browserVersion',
          'os',
          'deviceType',
          'timestamp'
        ]
      }]
    });
    
    if (!url) return res.status(404).json({ error: 'URL not found' });
    
    const statsData = {
      totalClicks: url.clicks.length,
      byCountry: {},
      byBrowser: {},
      byOS: {},
      byDevice: {},
      referrers: {},
      timeline: {}
    };
    
    url.clicks.forEach(click => {
      const country = click.region.split(',').pop()?.trim() || 'Unknown';
      statsData.byCountry[country] = (statsData.byCountry[country] || 0) + 1;
      
      const browserKey = `${click.browser} ${click.browserVersion}`;
      statsData.byBrowser[browserKey] = (statsData.byBrowser[browserKey] || 0) + 1;
      
      statsData.byOS[click.os] = (statsData.byOS[click.os] || 0) + 1;
      
      statsData.byDevice[click.deviceType] = (statsData.byDevice[click.deviceType] || 0) + 1;
      
      const referrer = click.referrer === 'direct' ? 'Direct' : new URL(click.referrer).hostname;
      statsData.referrers[referrer] = (statsData.referrers[referrer] || 0) + 1;
      
      const hour = new Date(click.timestamp).getHours();
      statsData.timeline[hour] = (statsData.timeline[hour] || 0) + 1;
    });
    
    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      statsData
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};