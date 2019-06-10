import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ParallaxBanner from '../components/ParallaxBanner';
import SponsorSection from '../components/Sponsors';
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
    <ParallaxBanner text={`Museo Nacional\nCentro de Arte Reina Sofía`} src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560197964/congreso/_edificio.jpg" />
    <Projects  lang={langKey} />
    <ParallaxBanner text={`Auditorio 400\nEdificio Nouvel`} src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560197964/congreso/_auditorio.jpg" />
    <Writing  lang={langKey} />
    <Stakeholders lang={langKey} />
    <SponsorSection />
    <Footer />
  </Layout>
);

export default IndexPage;