export const generateShareLink = (shortCode: string): string => {
  const baseUrl = process.env.BASE_URL;
  return `${baseUrl}/r/${shortCode}`;
};

export const generateStatsLink = (shortCode: string): string => {
  const frontendUrl = process.env.FRONTEND_URL;
  return `${frontendUrl}/stats/${shortCode}`;
};