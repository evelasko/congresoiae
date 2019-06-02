import React, { Fragment } from 'react';
import { SectionLink } from 'react-scroll-section';
import TextLoop from 'react-text-loop';
import { Heading, Text } from 'rebass';
import translations from '../../data/translations';
import MouseIcon from '../components/MouseIcon';
import Section from '../components/Section';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const LandingPage = ({lang}) => (
  <Section.Container id="home" Background={Background}>
    <Fragment>
      <Heading textAlign="center" as="h1" color="primary" fontSize={[5, 6, 8]} mb={[3, 4, 5]}>
        {translations.name[lang.slice(0,2)]}
      </Heading>
      <Heading as="h2" color="secondary" fontSize={[2, 3, 4]} mb={[2, 4]} textAlign="center">
        {translations.date[lang.slice(0,2)]}
      </Heading>
      <Heading as="h2" color="secondary" fontSize={[2, 3, 4]} mb={[2, 4]} textAlign="center" fontWeight="bold">
        {'Museo Nacional Centro de Arte Reina Sofía'}
      </Heading>
      <Heading as="h2" color="secondary" fontSize={[2, 3, 4]} mb={[2, 4]} textAlign="center" fontWeight="bold">
        {translations.place[lang.slice(0,2)]}
      </Heading>
      <Heading as="h2" color="primary" fontSize={[4, 5, 6]} mb={[3, 5]} textAlign="center">
        <TextLoop>
          {translations.subjects[lang.slice(0,2)].map(text => (<Text width={[300, 500]} key={text}>{text}</Text>))}
        </TextLoop>
      </Heading>
      <SectionLink section="about">
        {({ onClick }) => <MouseIcon onClick={onClick} />}
      </SectionLink>
    </Fragment>
  </Section.Container>
);

export default LandingPage;

// ------- social links:
// <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
// {socialLinks.map(({ id, ...rest }) => (
//   <Box mx={3} fontSize={[5, 6, 6]} key={id}>
//     <SocialLink {...rest} />
//   </Box>
// ))}
// </Flex>