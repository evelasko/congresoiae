import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import { Parallax } from 'react-scroll-parallax';
import { Box, Flex, Image } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import Logo from '../components/Logo/Logo.svg';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const ParallaxImage = () => (
  <Parallax  y={[-20, 20]}>
      <Image src="https://res.cloudinary.com/huh9ixig7/image/upload/v1559925659/congreso/bg_b.jpg" />
  </Parallax>
);

const ProfilePicture = styled(Image)`
  transition: all 0.25s ease-out;
  &:hover {
    border-radius: 20%;
  }
`;

const About = ({lang}) => (
  <Section.Container id="about">
    <Section.Header name={ translations.menu.about[lang.slice(0,2)] } icon="" label="person" />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          allContentfulAbout {
            edges { node {
              node_locale
    	        aboutMe { childMarkdownRemark { rawMarkdownBody } }
  		        profile { title image: resize(width: 450, quality: 100) { src } }
  	        }}
          }
        }
      `}
      render={data => {
        const { aboutMe, profile } = data.allContentfulAbout.edges.filter(({node}) => node.node_locale === lang)[0].node
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]} color={colors.secondary}>
              <Fade bottom>
                <ReactMarkdown
                  source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Fade right>
                <ProfilePicture
                  src={Logo}
                  alt={profile.title}
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
              </Fade>
            </Box>
            <Box width='100' height='50px' style={{overflow: 'hidden'}}>
              <ParallaxImage />
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default About;
