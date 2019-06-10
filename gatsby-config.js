const contentful = require('contentful');
const manifestConfig = require('./manifest-config');
const languages = require('./data/languages');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID, ANALYTICS_ID } = process.env;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = entry => entry.sys.contentType.sys.id === 'about';

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: { path: `${__dirname}/src/images`, name: 'images' }
  },
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
  `gatsby-plugin-netlify`,
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-plugin-manifest', options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyForNull: 'any', langKeyDefault: languages.defaultLangKey, useLangKeyLayout: false
    }
  },
  {
    resolve: 'gatsby-source-contentful',
    options: { spaceId: SPACE_ID, accessToken: ACCESS_TOKEN, },
  },
  {
    resolve: 'gatsby-plugin-zopfli'
  },
];

module.exports = client.getEntries().then(entries => {
  // const { mediumUser } = entries.items.find(getAboutEntry).fields;

  // plugins.push({
  //   resolve: 'gatsby-source-medium',
  //   options: { username: mediumUser || '@medium' },
  // });

  if (ANALYTICS_ID) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_ID,
      },
    });
  }

  return {
    siteMetadata: {
      // isMediumUserDefined: !!mediumUser,
      languages
    },
    plugins,
  };
});
