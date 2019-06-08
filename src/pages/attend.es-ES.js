import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';

const IndexPage = (props) => {
  console.log('PROPS: ',props)
  const { pageContext: { langKey }, location: { pathname } } = props
  return (
  <Layout lang={langKey} >
    <Header lang={langKey} pathname={pathname} />
    <p>Participa</p>
    <Footer />
  </Layout>
)};

export default IndexPage;