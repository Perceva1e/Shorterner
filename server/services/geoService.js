const axios = require('axios');

const getRegionByIp = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    
    if (response.data.status === 'success') {
      return `${response.data.city}, ${response.data.country}`;
    }
    return 'Unknown';
  } catch (error) {
    console.error('Geo location error:', error);
    return 'Unknown';
  }
};

module.exports = { getRegionByIp };