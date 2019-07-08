import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import { Box, Flex, Image } from 'rebass';
import styled from 'styled-components';
import Committees from '../../data/committes';
import translations from '../../data/translations';
import Logo from '../components/Logo/LogoColor.svg';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const ProfilePicture = styled(Image)`
  transition: all 0.25s ease-out;
  &:hover {
    border-radius: 20%;
  }
`;
const CommitteeContainer = styled.div`
  display: grid;
  margin-top: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-column-gap: 5px;
`;
const CommitteeList = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
`;
const CommitteListHeader = styled.div`
  display: block;
  width: 100%;
  background-color: ${colors.secondaryDark};
  color: ${colors.secondaryLight};
  margin-bottom: 20px;
  text-align: center;
  padding: 10px 5px 5px 5px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
const CommitteeListContent = styled.div`
  display: block;
  line-height: 1.2;
`;
const CommitteeItem = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: 25px;
`;
const CommitteeItemName = styled.div`
  width: 100%;
  display: inline-block;
  font-variant: small-caps;
  font-size: 14px;
`;
const CommitteeItemTitle = styled.div`
  width: 100%;
  display: inline-block;
  font-family: 'Tranx', sans-serif;
  font-size: 9px;
  text-transform: uppercase;
  color: ${colors.secondaryLight};
`;

const About = ({ lang }) => (
  <Section.Container id="about">
    <Section.Header
      name={translations.menu.about[lang.slice(0, 2)]}
      icon=""
      label="person"
    />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          allContentfulAbout {
            edges {
              node {
                node_locale
                aboutMe {
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
                profile {
                  title
                  image: resize(width: 450, quality: 100) {
                    src
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { aboutMe, profile } = data.allContentfulAbout.edges.filter(
          ({ node }) => node.node_locale === lang,
        )[0].node;
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]} color={colors.secondary}>
              <ReactMarkdown
                source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                renderers={markdownRenderer}
              />
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Fade right>
                <ProfilePicture
                  width="200px"
                  height="200px"
                  src={Logo}
                  alt={profile.title}
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
    <Box mt={100}>
      <Section.Header name={translations.headers.committes[lang.slice(0, 2)]} />
      <CommitteeContainer>
        <CommitteeList>
          <CommitteListHeader>
            {Committees.honor.header[lang.slice(0, 2)]}
          </CommitteListHeader>
          <CommitteeListContent>
            {Committees.honor.items.map(({ name, title }, i) => (
              <CommitteeItem key={i}>
                <CommitteeItemName>{name}</CommitteeItemName>
                <CommitteeItemTitle>{title}</CommitteeItemTitle>
              </CommitteeItem>
            ))}
          </CommitteeListContent>
        </CommitteeList>
        <CommitteeList>
          <CommitteListHeader>
            {Committees.organizing.header[lang.slice(0, 2)]}
          </CommitteListHeader>
          <CommitteeListContent>
            {Committees.organizing.items.map(({ name, title }, i) => (
              <CommitteeItem key={i}>
                <CommitteeItemName>{name}</CommitteeItemName>
                <CommitteeItemTitle>{title}</CommitteeItemTitle>
              </CommitteeItem>
            ))}
          </CommitteeListContent>
        </CommitteeList>
        <CommitteeList>
          <CommitteListHeader>
            {Committees.cientific.header[lang.slice(0, 2)]}
          </CommitteListHeader>
          <CommitteeListContent>
            {Committees.cientific.items.map(({ name, title }, i) => (
              <CommitteeItem key={i}>
                <CommitteeItemName>{name}</CommitteeItemName>
                <CommitteeItemTitle>{title}</CommitteeItemTitle>
              </CommitteeItem>
            ))}
          </CommitteeListContent>
        </CommitteeList>
      </CommitteeContainer>
    </Box>
  </Section.Container>
);

export default About;
