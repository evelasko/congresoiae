import React from 'react';
import Downloads from '../components/Downloads';
import Layout from '../components/Layout';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <Downloads />
    </Layout>
  );
};

export default IndexPage;
