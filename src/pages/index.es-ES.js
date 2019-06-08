import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import About from '../sections/About';
import Landing from '../sections/Landing';
import Projects from '../sections/Projects';
import Stakeholders from '../sections/Stakeholders';
import Writing from '../sections/Writing';

const IndexPage = ({ pageContext: { langKey }, location: { pathname } }) => (
  <Layout lang={langKey}>
    <Header  lang={langKey} pathname={pathname}  />
    <Landing  lang={langKey} />
    <About  lang={langKey} />
    <Projects  lang={langKey} />
    <Writing  lang={langKey} />
    <Stakeholders lang={langKey} />
    <Footer />
  </Layout>
);

export default IndexPage;