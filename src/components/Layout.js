import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import config from 'react-reveal/globals';
import { ScrollingProvider } from 'react-scroll-section';
import 'react-tippy/dist/tippy.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import colors from '../../colors';
import Helmet from './Helmet';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before { 
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  }

body {
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
  margin: 0;
  font-family: Cabin;
  overflow-x: hidden;
}
`;

config({ ssrFadeout: true });

const Layout = (props) => {
  const { children, lang } = props
  console.log('PROPS@ Layout: ', props)
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={{ colors }}>
        <ScrollingProvider>
          <Helmet lang={lang} />
          {children}
        </ScrollingProvider>
      </ThemeProvider>
    </Fragment>
  )}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
