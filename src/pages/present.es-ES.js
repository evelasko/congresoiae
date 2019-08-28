import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import PresentSections from '../sections/PresentSections';
import HeaderCompact from '../components/HeaderCompact';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <HeaderCompact lang={langKey} pathname={pathname} />
      <PresentSections lang={langKey} />
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
