import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Heading, Text } from 'rebass';
import styled from 'styled-components';
import translations from '../../data/translations';
import { Card, CardContainer } from '../components/Card';
import Section from '../components/Section';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

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
    <EllipsisHeading m={3} p={1}> {title} </EllipsisHeading>
    {image && <CoverImage src={`https:${image}`} height="200px" alt={title} />}
    <Text m={3} word-break='break-all'>{desc}</Text>
  </Card>
);

const Writing = ({ lang }) => (
  <StaticQuery
    query={graphql`
      query TopicsQuery {
        allContentfulTopics {
          edges {
            node {
              id
              title
              desc { desc }
              node_locale
              image { image: resize(width: 450, quality: 100) { src } }
            }
          }
        }
      }
    `}
    render={({ allContentfulTopics }) => {
      const topics = allContentfulTopics.edges.filter(({node}) => node.node_locale === lang)
      return (
          <Section.Container id="writing">
            <Section.Header name={translations.menu.writing[lang.slice(0,2)]} icon="" label="writing" />
            <CardContainer minWidth="250px">
              {
                topics.map(({node: {title, id, image, desc}}) => ( 
                  <Fade bottom key={`F${id}`} > 
                    <Post key={id} title={title} image={image.image.src} desc={desc.desc} />
                  </Fade> 
                  )
                )
              }
            </CardContainer>
          </Section.Container>
        ) 
    }}
  />
);

export default Writing;
