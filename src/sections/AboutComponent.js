import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Image } from 'rebass';
import styled from 'styled-components';
import markdownRenderer from '../components/MarkdownRenderer';
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
  font-weight: 700;
  font-size: 18px;
`;
const CommitteeItemTitle = styled.div`
  width: 100%;
  display: inline-block;
  font-family: 'Tranx', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  color: ${colors.secondary};
`;

const AboutComponent = ({ lang }) => (
  <div>
    <h1 style={{ marginLeft: '20px' }}>
      <strong>{lang === 'es-ES' ? 'Convocatoria' : 'Call for Papers'}</strong>
    </h1>
    <StaticQuery
      query={graphql`
        query AboutMeCompQuery {
          allContentfulAbout {
            edges {
              node {
                node_locale
                aboutMe {
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { aboutMe } = data.allContentfulAbout.edges.filter(
          ({ node }) => node.node_locale === lang,
        )[0].node;
        return (
          <Box width={[1]} px={[1, 2, 4]} color={colors.secondary}>
            <ReactMarkdown
              source={aboutMe.childMarkdownRemark.rawMarkdownBody}
              renderers={markdownRenderer}
            />
          </Box>
        );
      }}
    />
  </div>
);

export default AboutComponent;
