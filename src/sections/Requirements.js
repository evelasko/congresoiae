import React from 'react';
import { Image } from 'rebass';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Section from '../components/Section';
import programa from './programa_2022.pdf';

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const Requirements = () => (
  <Section.Container id="agenda">
    <Section.Header name="Programa" icon="" label="person" />
    <center>
      <a href={programa} download>
        <h3>
          Descarga aquí la programación de la segunda edición del Congreso
          Mundial de Investigación en las Artes del Espectáculo, Salamanca 2022
        </h3>
      </a>
    </center>
  </Section.Container>
);

export default Requirements;
