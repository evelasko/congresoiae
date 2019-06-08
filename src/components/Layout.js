import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import config from 'react-reveal/globals';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ScrollingProvider } from 'react-scroll-section';
import 'react-tippy/dist/tippy.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import Helmet from './Helmet';

config({ ssrFadeout: true });

const Layout = (props) => {
  const { children, lang } = props
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ScrollingProvider>
          <ParallaxProvider>
            <Helmet lang={lang} />
            {children}
          </ParallaxProvider>
        </ScrollingProvider>
      </ThemeProvider>
    </Fragment>
  )}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
