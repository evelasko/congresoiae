import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Heading } from 'rebass';
import styled from 'styled-components';
import Bcm from '../../assets/bcm.svg';
import Fundacion from '../../assets/fundacionaa.svg';
import Iti from '../../assets/iti.svg';
import ReinaSofia from '../../assets/rsofia.svg';
import Unitwin from '../../assets/unitwin.svg';
import Urjc from '../../assets/urjc.svg';
import { colors } from '../styles/theme';

const sponsors = [ReinaSofia, Fundacion, Iti, Unitwin, Bcm, Urjc];

const SponsorWrapper = styled.div`
  width: 100%;
  background-color: ${colors.secondary};
`;
const SponsorContainer = styled.div`
  width: 100%;
  padding: 10px;
  padding-bottom: 40px;
  align-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;
const SponsorHeading = styled.div`
  width: 100%;
  margin: 20px;
  padding-top: 5px;
  display: inline-block;
`;
const Sponsor = styled.img`
  align-self: center;
  width: 164px;
  height: 164px;
  /* @media (min-width: 400px) {
    width: 48px;
    height: 48px;
  } */
`;

const SponsorSection = ({ lang }) => (
  <SponsorWrapper>
    <Fade left>
      <SponsorHeading>
        <Heading
          color="secondaryLight"
          mb={4}
          fontFamily="Tranx"
          fontSize="34px"
          fontWeight="100"
          lineHeight="38px"
        >
          {lang === 'es-ES' ? 'Patrocinadores' : 'Sponsors'}
        </Heading>
      </SponsorHeading>
    </Fade>
    <SponsorContainer>
      {sponsors.map((sponsor, i) => (
        <center key={`sponsor${i}`}>
          <Zoom clear>
            <Sponsor src={sponsor} />
          </Zoom>
        </center>
      ))}
    </SponsorContainer>
  </SponsorWrapper>
);

export default SponsorSection;
