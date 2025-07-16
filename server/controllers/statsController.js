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
          'referrer',
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
      const country = click.region && typeof click.region === 'string' 
        ? click.region.split(',').pop()?.trim() || 'Unknown' 
        : 'Unknown';
      statsData.byCountry[country] = (statsData.byCountry[country] || 0) + 1;

      const browserKey = `${click.browser || 'Unknown'} ${click.browserVersion || ''}`.trim();
      statsData.byBrowser[browserKey] = (statsData.byBrowser[browserKey] || 0) + 1;
      
      statsData.byOS[click.os || 'Unknown'] = (statsData.byOS[click.os] || 0) + 1;
      
      statsData.byDevice[click.deviceType || 'Unknown'] = (statsData.byDevice[click.deviceType] || 0) + 1;
      
      let referrer = 'Direct';
      if (click.referrer && click.referrer !== 'direct') {
        try {
          const url = new URL(click.referrer);
          referrer = url.hostname.replace(/^www\./, ''); 
        } catch (e) {
          referrer = 'Unknown';
        }
      }
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