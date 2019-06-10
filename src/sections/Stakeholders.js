import React from 'react';
import { Heading, Image, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const CARD_HEIGHT = '200px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;


const CallContainer = styled.footer`
  padding: 1em;
  margin-top: 50px;
  background: ${props => props.theme.colors.primary};
  color: ${colors.secondaryDark};
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;
const CallColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  margin: 10px;
  align-content: center;
  white-space: pre-wrap;
  font-family: 'Tranx', sans-serif;
  font-weight: 100;
  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} + ${CARD_HEIGHT} / 2);
  }
`;

const Stakeholders = ({ lang }) => (
  <Section.Container id="stakeholders">
    <Section.Header name={translations.menu.stakeholders[lang.slice(0,2)]} icon="" Box="notebook" />
    <CallContainer>
        <CallColumn>
          <Heading mb={4}>{translations.call[lang.slice(0,2)].modalities[0].toUpperCase()}</Heading>
          <Image />
          <Text>{translations.call[lang.slice(0,2)].description[0]}</Text>
        </CallColumn>
        <CallColumn>
          <Heading mb={4}>{translations.call[lang.slice(0,2)].modalities[1].toUpperCase()}</Heading>
          <Image />
          <Text>{translations.call[lang.slice(0,2)].description[1]}</Text>
        </CallColumn>
    </CallContainer>
  </Section.Container>
);

export default Stakeholders;
