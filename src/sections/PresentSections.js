import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Flex } from 'rebass';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';

const PresentSections = ({ lang }) => (
  <StaticQuery
    query={graphql`
      query PresentSectionsQuery {
        allContentfulCallSections(sort: { fields: order, order: ASC }) {
          edges {
            node {
              node_locale
              content {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
              title
            }
          }
        }
      }
    `}
    render={data => {
      const nodes = data.allContentfulCallSections.edges.filter(
        ({ node }) => node.node_locale === lang,
      );
      console.log('NODES: ', nodes);
      return nodes.map(({ node: { title, content } }) => (
        <Section.Container id={title} key={title}>
          <Section.Header name={title} icon="" label="person" />
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box>
              <ReactMarkdown
                source={content.childMarkdownRemark.rawMarkdownBody}
                renderers={markdownRenderer}
              />
            </Box>
          </Flex>
        </Section.Container>
      ));
    }}
  />
);

export default PresentSections;
