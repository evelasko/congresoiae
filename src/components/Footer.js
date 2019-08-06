import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Box, Image, Text } from 'rebass';
import styled from 'styled-components';
import Catedra from '../../assets/fundacion.svg';
import VM from '../../media/vmlogos.png';
import { colors } from '../styles/theme';

const CARD_HEIGHT = '200px';
const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const FooterWrapper = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${colors.secondaryDark};
  width: 100%;
`;

const FooterContainer = styled.footer`
  padding: 1em;

  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;
const FooterColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  align-content: center;
  align-items: center;
  white-space: pre-wrap;
  font-family: 'Tranx', sans-serif;
  font-weight: 100;
  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} + ${CARD_HEIGHT} / 2);
  }
`;

const FooterBase = styled.div`
  width: 100%;
  font-family: 'Tranx', sans-serif;
  font-weight: 300;
  font-size: 10px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const Logo = ({ url, logo, alt = '' }) => (
  <Box>
    <a href={url} rel="noopener noreferrer" target="_blank">
      <Image width="220px" src={logo} alt={alt} />
    </a>
  </Box>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const Footer = ({ lang = 'es-ES' }) => (
  <FooterWrapper>
    <FooterContainer>
      <Fade bottom>
        <FooterColumn>
          <Logo
            url="https://www.alicialonso.org/"
            logo={Catedra}
            alt="Cátedra UNESCO de Danza Alicia Alonso"
          />
        </FooterColumn>
        <FooterColumn>
          <Text>
            {`Fundación Alicia Alonso
Camino del Molino SN
Campus URJC Edificio Gestión
28943, Fuenlabrada
Madrid. España
Tel: (+34) 914 888 177
congreso@alicialonso.org`}
          </Text>
        </FooterColumn>
        <FooterColumn>
          <Box>
            <p>
              <Link to={`/${lang}/privacy/`}>Privacidad de Datos</Link>
            </p>
            <p>
              <Link to={`/${lang}/cookies/`}>Política de Cookies</Link>
            </p>
            <p>
              <Link to={`/${lang}/policy/`}>Política de Cancelaciones</Link>
            </p>
            <img src={VM} width="100" />
          </Box>
        </FooterColumn>
      </Fade>
    </FooterContainer>
    <FooterBase>
      {`FUNDACIÓN DE LA DANZA ALICIA ALONSO [ CIF: G81731705 ]
Camino del Molino SN, Fuenlabrada. Madrid
© Enrique Velasco`}
    </FooterBase>
  </FooterWrapper>
);

export default Footer;
