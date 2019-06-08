import { Flex as FlexR } from '@rebass/grid';
import React, { Fragment } from 'react';
import { SectionLink } from 'react-scroll-section';
import TextLoop from 'react-text-loop';
import { Button, Heading, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import Hero from '../components/Hero';
import MouseIcon from '../components/MouseIcon';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const Background = () => (<div><Hero img='https://res.cloudinary.com/huh9ixig7/image/upload/v1559925659/congreso/bg_b.jpg' /></div>)

const HeadingA = styled(Heading)`
  text-align: center;
  color: #e6e7e9;
  font-family: 'Tranx', sans-serif;
  font-weight: 400;
  text-shadow: 0px 0px 35px ${colors.secondary};
`

const LandingPage = ({lang}) => (
  <Section.Container id="home" Background={Background}>
    <Fragment>
      <HeadingA as="h1" lineHeight={["40px", "60px", "85px"]} fontSize={[5, 6, 8]} mb={[3, 4, 5]} px={[4, 16, 20]}>
        {translations.name[lang.slice(0,2)].toUpperCase()}
      </HeadingA>
      <Heading as="h2" color="backgroundDark" fontSize={[2, 3, 4]} mb={[2, 4]} textAlign="center">
        {translations.date[lang.slice(0,2)]}
      </Heading>
      <Heading as="h2" color="backgroundDark" fontWeight="200" font fontSize={[2, 3, 6]} mb={[2, 4]} textAlign="center" fontWeight="bold">
        {'Museo Nacional Centro de Arte Reina Sofía'}
      </Heading>
      <Heading as="h2" color="backgroundDark" fontSize={[2, 3, 6]} mb={[2, 4]} textAlign="center" fontWeight="bold">
        {translations.place[lang.slice(0,2)]}
      </Heading>
      <Heading as="h2" color="backgroundDark" my={5} fontFamily={'Tranx'} fontWeight='400' fontSize={[3, 4, 5]} my={[3, 5]} textAlign="center">
        <TextLoop>
          {translations.subjects[lang.slice(0,2)].map(text => (<Text width={[300, 500]} key={text}>{text.toUpperCase()}</Text>))}
        </TextLoop>
      </Heading>
      <FlexR alignItems='center' justifyContent='center' >
        <Button variant='outlineLight' mx={3} fontSize={[1, 3]} onClick={() => {console.log('GO SOMEWHERE')}}>Participa</Button>
        <Button variant='outlineLight' mx={3} fontSize={[1, 3]}>Expone</Button>
      </FlexR>
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