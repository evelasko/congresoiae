import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import { Box, Flex } from 'rebass';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';


const Stakeholders = ({lang}) => (
  <Section.Container id="stakeholders">
    <Section.Header name="Stakeholders" label="stakeholder" />
    <StaticQuery
      query={graphql`
        query StakeholdersQuery {
          allContentfulAbout {
            edges { node {
              node_locale
    	        aboutMe {
      	        childMarkdownRemark { rawMarkdownBody }
    	        }
  		        profile {
    		        title
    		        image: resize(width: 450, quality: 100) { src }
              }
  	        }}
          }
        }
      `}
      render={data => {

        const { aboutMe, profile } = data.allContentfulAbout.edges.filter(({node}) => node.node_locale === lang)[0].node
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
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
                  src={profile.image.src}
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
  </Section.Container>
);

export default Stakeholders;
