import { Url, Click } from '../models/models';
import { generateShareLink, generateStatsLink } from '../utils/generateLinks';
import shortid from 'shortid';
import { UAParser } from 'ua-parser-js'; 
import axios from 'axios';

interface ClickData {
  ipAddress: string;
  userAgent: string;
  referrer: string;
  region: string; 
  browser: string;
  browserVersion: string;
  os: string;
  deviceType: string;
}

export const createShortUrl = async (originalUrl: string): Promise<{ shareLink: string; statsLink: string }> => {
  const shortCode = shortid.generate();
  const url = await Url.create({ originalUrl, shortCode });
  const shareLink = generateShareLink(shortCode);
  const statsLink = generateStatsLink(shortCode);
  return { shareLink, statsLink };
};

export const redirectToUrl = async (shortCode: string, clickData: ClickData): Promise<string> => {
  const url = await Url.findOne({ where: { shortCode } });
  if (!url) {
    throw new Error('URL not found');
  }

  await Click.create({
    urlId: url.id,
    ipAddress: clickData.ipAddress,
    userAgent: clickData.userAgent,
    referrer: clickData.referrer,
    region: clickData.region, 
    browser: clickData.browser,
    browserVersion: clickData.browserVersion,
    os: clickData.os,
    deviceType: clickData.deviceType,
  });

  return url.originalUrl;
};

export const getClickData = async (userAgent: string, ip: string, referrer: string): Promise<ClickData> => {
  const parser = new UAParser(userAgent); 
  const uaResult = parser.getResult();

  const ipAddress = ip === '::1' ? '8.8.8.8' : ip;
  let region = 'Unknown';
  try {
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    const data = response.data;
    region = data.error ? 'Unknown' : `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
  } catch (err: unknown) {
    console.error('Error fetching geolocation:', err instanceof Error ? err.message : 'Unknown error');
  }

  return {
    ipAddress,
    userAgent,
    referrer: referrer || 'direct',
    region, 
    browser: uaResult.browser.name || 'Unknown',
    browserVersion: uaResult.browser.version || 'Unknown',
    os: uaResult.os.name || 'Unknown',
    deviceType: uaResult.device.type || 'desktop',
  };
};