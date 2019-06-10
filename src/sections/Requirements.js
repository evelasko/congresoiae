import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Flex, Image } from 'rebass';
import styled from 'styled-components';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const Requirements = () => (
  <Section.Container id="requirements" Background={Background}>
    <Section.Header name="Requirements" icon="" label="person" />
    <StaticQuery
      query={graphql`
        query RequirementsQuery {
          contentfulAbout {
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
      `}
      render={data => {
        const { aboutMe, profile } = data.contentfulAbout;
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
                <ReactMarkdown
                  source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
                <ProfilePicture
                  src={profile.image.src}
                  alt={profile.title}
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default Requirements;
