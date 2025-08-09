export interface ShortUrlResponse {
  shareLink: string;
  statsLink: string;
}

export interface Click {
  id: number;
  ipAddress?: string;
  region?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  deviceType?: string;
  referrer?: string;
  timestamp: string;
}

export interface StatsData {
  totalClicks: number;
  byCountry: Record<string, number>;
  byBrowser: Record<string, number>;
  byOS: Record<string, number>;
  byDevice: Record<string, number>;
  referrers: Record<string, number>;
  timeline: Record<string, number>;
}

export interface UrlStats {
  originalUrl: string;
  clicks: Click[];
  statsData: StatsData;
}