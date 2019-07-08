import React from 'react';
import { Image } from 'rebass';
import styled from 'styled-components';
import Section from '../components/Section';

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const Requirements = () => (
  <Section.Container id="agenda">
    <Section.Header name="agenda" icon="" label="person" />

    <Section.Header></Section.Header>
  </Section.Container>
);

export default Requirements;
