import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Flex, Image, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import Section from '../components/Section';

const CARD_HEIGHT = '200px';
const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 100;
  font-variant: small-caps;
  display: table;
  text-align: center;
`;

const TextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  align-content: center;
  text-align: center;
  /* width: calc(100% - ${CARD_HEIGHT}); */

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} + ${CARD_HEIGHT} / 2);
  }
`;
const Description = styled.div`
  display: inline-block;
  width: 100%;
`;

const SpeakerPhoto = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
`;

const SpeakerContainer = styled.div`
  display: grid;
  margin-top: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

const SpeakerCard = styled.div`
  align-content: center;
  align-items: center;
  height: auto;
  margin-top: 10px;
  display: inline-block;
  height: auto;
`;

const Project = ({ fullName, description, photo }) => (
  <SpeakerCard>
    <Flex
      flexDirection="column"
      alignItems="center"
      style={{ height: CARD_HEIGHT }}
    >
      <SpeakerPhoto src={photo.image.src} alt={photo.title} />
      <TextContainer>
        <Title>{fullName}</Title>
        <Description>
          <Text width={[1]} style={{ overflow: 'auto', fontSize: 12 }}>
            {description}
          </Text>
        </Description>
      </TextContainer>
    </Flex>
  </SpeakerCard>
);

const Projects = ({ lang }) => (
  <Section.Container id="projects">
    <Section.Header
      name={translations.menu.projects.slug[lang.slice(0, 2)]}
      icon=""
      Box="notebook"
    />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          allContentfulSpeaker {
            edges {
              node {
                id
                node_locale
                fullName
                description {
                  description
                }
                photo {
                  title
                  image: resize(width: 200, quality: 100) {
                    src
                  }
                }
              }
            }
          }
        }
      `}
      render={({ allContentfulSpeaker }) => {
        const speakers = allContentfulSpeaker.edges.filter(
          ({ node }) => node.node_locale === lang,
        );
        return (
          <SpeakerContainer>
            {speakers.map(({ node }, i) => {
              const nd = Object.assign(node, node.description);
              return <Project key={node.id} {...nd} />;
            })}
          </SpeakerContainer>
        );
      }}
    />
  </Section.Container>
);

export default Projects;
