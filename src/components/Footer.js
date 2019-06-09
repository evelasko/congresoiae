import PropTypes from 'prop-types';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Box, Image, Text } from 'rebass';
import styled from 'styled-components';
import Catedra from '../../assets/catedra.svg';
import { colors } from '../styles/theme';

const CARD_HEIGHT = '200px';
const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const FooterContainer = styled.footer`
  padding: 1em;
  background: ${props => props.theme.colors.primary};
  color: ${colors.secondaryDark};
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
  white-space: pre-wrap;
  font-family: 'Tranx', sans-serif;
  font-weight: 100;
  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} + ${CARD_HEIGHT} / 2);
  }
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

const Footer = () => (
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
        <Text fontWeight={600}>Contacto</Text>
        <Text>
        {
`Cátedra Iberoamericana de Danza
Alicia Alonso
Camino del Molino SN
Campus URJC Edificio Gestión
28943, Fuenlabrada
Madrid. España
Tel: (123) - 123 123
catedra@alicialonso.org`
        }
        </Text>
      </FooterColumn>
      <FooterColumn>
        <Text>Links</Text>
      </FooterColumn>
    </Fade>
  </FooterContainer>
);

export default Footer;
