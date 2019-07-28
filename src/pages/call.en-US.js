import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import AboutComponent from '../sections/AboutComponent';
import PresentSections from '../sections/PresentSections';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <AboutComponent lang={langKey} />
      <Header lang={langKey} pathname={pathname} />
      <PresentSections lang={langKey} />
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
