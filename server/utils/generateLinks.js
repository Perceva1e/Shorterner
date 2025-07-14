module.exports.generateShareLink = (req, shortCode) => {
  return `${req.protocol}://${req.get('host')}/api/r/${shortCode}`;
};

module.exports.generateStatsLink = (req, shortCode) => {
  return `${req.protocol}://${req.get('host')}/api/stats/${shortCode}`;
};