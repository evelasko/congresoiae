import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Heading } from 'rebass';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Program from '../../data/program';
import translations from '../../data/translations';
import { Card, CardContainer } from '../components/Card';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';
import { colors } from '../styles/theme';

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const Post = ({ title, desc, image }) => (
  <Card pb={4}>
    <EllipsisHeading m={3} p={1}>
      {' '}
      {title}{' '}
    </EllipsisHeading>
    {image && <CoverImage src={`https:${image}`} height="200px" alt={title} />}
    <Box m={3} word-break="break-all">
      <ReactMarkdown
        source={desc.childMarkdownRemark.rawMarkdownBody}
        renderers={markdownRenderer}
      />
    </Box>
  </Card>
);

const ProgramContainer = styled.div`
  display: grid;
  margin-top: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-column-gap: 5px;
`;
const ProgramList = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
`;
const ProgramListHeader = styled.div`
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
const ProgramListContent = styled.div`
  display: block;
  line-height: 1.2;
  justify-content: center;
  align-content: center;
  text-align: center;
`;
const ProgramItem = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: 25px;
`;
const ProgramItemTime = styled.div`
  width: 100%;
  font-variant: small-caps;
`;
const ProgramItemTitle = styled.div`
  width: 100%;
  display: inline-block;
  font-family: 'Tranx', sans-serif;
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
  color: ${colors.secondary};
`;
const ProgramItemSubtitle = styled.div`
  font-size: 12px;
`;
const ProgramItemData = styled.div``;

const Writing = ({ lang }) => (
  <Section.Container id="writing">
    <Section.Header
      name={translations.menu.writing[lang.slice(0, 2)]}
      icon=""
      label="writing"
    />
    <StaticQuery
      query={graphql`
        query TopicsQuery {
          allContentfulTopics {
            edges {
              node {
                id
                title
                desc {
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
                node_locale
                image {
                  image: resize(width: 450, quality: 100) {
                    src
                  }
                }
              }
            }
          }
        }
      `}
      render={({ allContentfulTopics }) => {
        const topics = allContentfulTopics.edges.filter(
          ({ node }) => node.node_locale === lang,
        );
        return (
          <CardContainer minWidth="250px">
            {topics.map(({ node: { title, id, image, desc } }) => (
              <Post
                key={id}
                title={title}
                image={image.image.src}
                desc={desc}
              />
            ))}
          </CardContainer>
        );
      }}
    />
    {/* <Section.Header name={translations.headers.program[lang.slice(0, 2)]} />
    <ProgramContainer>
      <ProgramList>
        <ProgramListHeader>
          {Program.day24.title[lang.slice(0, 2)]}
        </ProgramListHeader>
        <ProgramListContent>
          {Program.day24.items.map(({ time, title, subtitle }, i) => (
            <ProgramItem key={`24${i}`}>
              <ProgramItemTime>{time}</ProgramItemTime>
              <ProgramItemData>
                <ProgramItemTitle>{title[lang.slice(0, 2)]}</ProgramItemTitle>
                {subtitle && (
                  <ProgramItemSubtitle>
                    {subtitle[lang.slice(0, 2)]}
                  </ProgramItemSubtitle>
                )}
              </ProgramItemData>
            </ProgramItem>
          ))}
        </ProgramListContent>
      </ProgramList>
      <ProgramList>
        <ProgramListHeader>
          {Program.day25.title[lang.slice(0, 2)]}
        </ProgramListHeader>
        <ProgramListContent>
          {Program.day25.items.map(({ time, title, subtitle }, i) => (
            <ProgramItem key={`25${i}`}>
              <ProgramItemTime>{time}</ProgramItemTime>
              <ProgramItemData>
                <ProgramItemTitle>{title[lang.slice(0, 2)]}</ProgramItemTitle>
                {subtitle && (
                  <ProgramItemSubtitle>
                    {subtitle[lang.slice(0, 2)]}
                  </ProgramItemSubtitle>
                )}
              </ProgramItemData>
            </ProgramItem>
          ))}
        </ProgramListContent>
      </ProgramList>
      <ProgramList>
        <ProgramListHeader>
          {Program.day26.title[lang.slice(0, 2)]}
        </ProgramListHeader>
        <ProgramListContent>
          {Program.day26.items.map(({ time, title, subtitle }, i) => (
            <ProgramItem key={`26${i}`}>
              <ProgramItemTime>{time}</ProgramItemTime>
              <ProgramItemData>
                <ProgramItemTitle>{title[lang.slice(0, 2)]}</ProgramItemTitle>
                {subtitle && (
                  <ProgramItemSubtitle>
                    {subtitle[lang.slice(0, 2)]}
                  </ProgramItemSubtitle>
                )}
              </ProgramItemData>
            </ProgramItem>
          ))}
        </ProgramListContent>
      </ProgramList>
    </ProgramContainer> */}
  </Section.Container>
);

export default Writing;
