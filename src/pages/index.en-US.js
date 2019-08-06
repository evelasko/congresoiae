import React from 'react';
import CookieConsent from 'react-cookie-consent';
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

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <Header lang={langKey} pathname={pathname} />
      <Landing lang={langKey} />
      <About lang={langKey} />
      <ParallaxBanner
        text={`Museo Nacional\nCentro de Arte Reina Sofía`}
        src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560197964/congreso/_edificio.jpg"
      />
      <Projects lang={langKey} />
      <ParallaxBanner
        text={`Auditorio 400\nNouvel Building`}
        src="https://res.cloudinary.com/huh9ixig7/image/upload/v1560197964/congreso/_auditorio.jpg"
      />
      <Writing lang={langKey} />
      <Stakeholders lang={langKey} />
      <SponsorSection lang={langKey} />
      <Footer lang={langKey} />
      <CookieConsent
        location="bottom"
        buttonText="I Understand"
        cookieName="cookieNi"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
      </CookieConsent>
    </Layout>
  );
};

export default IndexPage;
