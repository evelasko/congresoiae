import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Flex, Image, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import { Card, CardContainer } from '../components/Card';
import Section from '../components/Section';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '200px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProjectImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({ fullName, description, photo }) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span><Title my={2} pb={1}>{fullName}</Title></span>
        <Text width={[1]} style={{ overflow: 'auto' }}>
          { description ? 'Description' : 'No description' }
        </Text>
      </TextContainer>
      <ImageContainer>
        <ProjectImage src={photo.image.src} alt={photo.title} />
      </ImageContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // projectUrl: PropTypes.string.isRequired,
  // repositoryUrl: PropTypes.string.isRequired,
  // logo: PropTypes.shape({
  //   image: PropTypes.shape({
  //     src: PropTypes.string,
  //   }),
  // }).isRequired,
};

const Projects = ({lang}) => (
  <Section.Container id="projects">
    <Section.Header name={translations.menu.projects.slug[lang.slice(0,2)] } icon="" Box="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          allContentfulSpeaker {
            edges { node {
              id
              fullName
              description { description }
              photo { title image: resize(width: 200, quality: 100) { src } }
              }
            }
          }
        }
      `}
      render={({ allContentfulSpeaker }) => (
        <CardContainer minWidth="350px">
          {allContentfulSpeaker.edges.map(({node}, i) => {
            const nd = Object.assign(node, node.description)
            return (
              <Fade bottom delay={i * 200} key={`F${node.id}`}>
                <Project key={node.id} {...nd} />
              </Fade>
          )})}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
