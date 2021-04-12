import googleFontApi from './googlefonts';
import googleFontApiDev from './googlefontsdev';

// 'googleFontApi' for only 'https://markdown-reader-ruvkr.web.app/*'
// 'googleFontApiDev' is private and only for local development
export const getGoogleFontsApi = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    return googleFontApiDev;
  else return googleFontApi;
};
