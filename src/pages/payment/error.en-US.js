import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <Header lang={langKey} pathname={pathname} />
      <h2>Error Processing Payment</h2>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
