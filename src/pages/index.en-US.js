import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import About from '../sections/About';
import Landing from '../sections/Landing';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';

const IndexPage = (props) => {
  console.log('PROPS: ',props)
  const { pageContext: { langKey } } = props
  return (
  <Layout lang={langKey} >
    <Header lang={langKey} />
    <Landing lang={langKey}  />
    <About lang={langKey} />
    <Projects lang={langKey}  />
    <Writing lang={langKey}  />
    <Footer />
  </Layout>
)};

export default IndexPage;