import { Link } from 'gatsby';
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
import Requirements from '../sections/Requirements';

const IndexPage = ({ pageContext: { langKey }, location: { pathname } }) => (
  <Layout lang={langKey}>
    <Header lang={langKey} pathname={pathname} />
    <Landing lang={langKey} />
    <Requirements />
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

    <SponsorSection />
    <Footer lang={langKey} />
    <CookieConsent
      location="bottom"
      buttonText="Entendido"
      cookieName="cookieNi"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={150}
    >
      Este sitio web utiliza cookies para ofrecer sus servicios con la mejor
      experiencia de usuario posible. Al hacer uso del mismo asumimos tu
      conformidad hacia nuestra{' '}
      <Link to={`/${langKey}/cookies/`}>Política de Cookies</Link>
    </CookieConsent>
  </Layout>
);

export default IndexPage;
