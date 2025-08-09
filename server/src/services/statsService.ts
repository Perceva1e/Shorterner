import { Url, Click } from '../models/models';

interface StatsData {
  totalClicks: number;
  byCountry: Record<string, number>;
  byBrowser: Record<string, number>;
  byOS: Record<string, number>;
  byDevice: Record<string, number>;
  referrers: Record<string, number>;
  timeline: Record<string, number>;
}

interface UrlStats {
  originalUrl: string;
  clicks: Click[];
  statsData: StatsData;
}

export const getUrlStats = async (shortCode: string): Promise<UrlStats> => {
  const url = await Url.findOne({
    where: { shortCode },
    include: [{
      model: Click,
      as: 'clicks',
      attributes: [
        'ipAddress',
        'region',
        'browser',
        'browserVersion',
        'os',
        'deviceType',
        'referrer',
        'timestamp',
      ],
    }],
  });

  if (!url) {
    throw new Error('URL not found');
  }

  const statsData: StatsData = {
    totalClicks: url.clicks.length,
    byCountry: {},
    byBrowser: {},
    byOS: {},
    byDevice: {},
    referrers: {},
    timeline: {},
  };

  url.clicks.forEach((click: Click) => {
    const country = click.region && typeof click.region === 'string'
      ? click.region.split(',').pop()?.trim() || 'Unknown'
      : 'Unknown';
    statsData.byCountry[country] = (statsData.byCountry[country] || 0) + 1;

    const browserKey = `${click.browser || 'Unknown'} ${click.browserVersion || ''}`.trim() || 'Unknown';
    statsData.byBrowser[browserKey] = (statsData.byBrowser[browserKey] || 0) + 1;

    const os = click.os || 'Unknown'; 
    statsData.byOS[os] = (statsData.byOS[os] || 0) + 1;

    const deviceType = click.deviceType || 'Unknown'; 
    statsData.byDevice[deviceType] = (statsData.byDevice[deviceType] || 0) + 1;

    let referrer = 'Direct';
    if (click.referrer && click.referrer !== 'direct') {
      try {
        const urlObj = new URL(click.referrer);
        referrer = urlObj.hostname.replace(/^www\./, '');
      } catch {
        referrer = 'Unknown';
      }
    }
    statsData.referrers[referrer] = (statsData.referrers[referrer] || 0) + 1;

    if (click.createdAt instanceof Date && !isNaN(click.createdAt.getTime())) {
      const hour = click.createdAt.getHours().toString();
      statsData.timeline[hour] = (statsData.timeline[hour] || 0) + 1;
    }
  });

  return {
    originalUrl: url.originalUrl,
    clicks: url.clicks,
    statsData,
  };
};