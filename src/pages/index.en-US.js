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
        text={`Palacio de Congresos de Castilla y León`}
        src="https://res.cloudinary.com/dmpl8wypd/image/upload/v1655751593/alicialonso/Exterior_-2-_vrsiar.jpg"
      />
      {/* <Projects lang={langKey} /> */}
      <Writing lang={langKey} />
      <ParallaxBanner
        text={`Sala Mayor`}
        src="https://res.cloudinary.com/dmpl8wypd/image/upload/v1655751597/alicialonso/Sala_Mayor_-3-_ex3zrt.jpg"
      />
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
