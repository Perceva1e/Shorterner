import axios from 'axios';

export const getRegionByIp = async (ip: string): Promise<string> => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const data = response.data;

    if (data.error) {
      return 'Unknown';
    }

    return `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Geo location error:', errorMessage);
    return 'Unknown';
  }
};