import React, { Fragment } from 'react';
import { SectionLink } from 'react-scroll-section';
import TextLoop from 'react-text-loop';
import { Heading, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import Hero from '../components/Hero';
import MouseIcon from '../components/MouseIcon';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const Background = () => (<div><Hero img='https://res.cloudinary.com/huh9ixig7/image/upload/v1560197982/congreso/_bg_b.jpg' /></div>)

const HeadingA = styled(Heading)`
  text-align: center;
  color: #e6e7e9;
  font-family: 'Tranx', sans-serif;
  font-weight: 400;
  text-shadow: 0px 0px 35px ${colors.secondary};
`
const HeadingWrap = styled.div`
  width: 100%;
  white-space: pre-wrap;
`

const LandingPage = ({lang}) => (
  <Section.Container id="home" Background={Background}>
    <Fragment>
      <HeadingA as="h1" lineHeight={["55px", "70px", "85px"]} fontSize={[5, 7, 8]} mb={[3, 4, 5]} px={[4, 16, 20]}>
        {translations.name[lang.slice(0,2)].toUpperCase()}
      </HeadingA>
      <HeadingWrap>
        <Heading as="h2" color="backgroundDark" fontWeight={100} lineHeight={[2, 2, 2]} fontSize={[1, 4, 5]} textAlign="center">
          {`${translations.date[lang.slice(0,2)]}\nMuseo Nacional Centro de Arte Reina Sofía\n${translations.place[lang.slice(0,2)]}`}
        </Heading>
      </HeadingWrap>
      <Heading as="h2" color="backgroundDark" my={5} fontFamily={'Tranx'} fontWeight='400' fontSize={[3, 4, 5]} my={[3, 5]} textAlign="center">
        <TextLoop>
          {translations.subjects[lang.slice(0,2)].map(text => (<Text width={[300, 500]} key={text}>{text.toUpperCase()}</Text>))}
        </TextLoop>
      </Heading>
      <SectionLink section="about">
        {({ onClick }) => <MouseIcon onClick={onClick} />}
      </SectionLink>
    </Fragment>
  </Section.Container>
);

export default LandingPage;
