import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import SponsorSection from '../components/Sponsors';
import About from '../sections/About';
import Landing from '../sections/Landing';
import Projects from '../sections/Projects';
import Stakeholders from '../sections/Stakeholders';
import Writing from '../sections/Writing';

const IndexPage = (props) => {
  console.log('PROPS: ',props)
  const { pageContext: { langKey }, location: { pathname } } = props
  return (
  <Layout lang={langKey} >
    <Header lang={langKey} pathname={pathname} />
    <Landing lang={langKey}  />
    <About lang={langKey} />
    <ParallaxBanner text={`Museo Nacional\nCentro de Arte Reina Sofía`} src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560010709/congreso/edificio.jpg" />
    <Projects lang={langKey}  />
    <ParallaxBanner text={`Auditorio 400\nNouvel Building`} src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560010705/congreso/auditorio.jpg" />
    <Writing lang={langKey}  />
    <Stakeholders lang={langKey} />
    <SponsorSection />
    <Footer />
  </Layout>
)};

export default IndexPage;