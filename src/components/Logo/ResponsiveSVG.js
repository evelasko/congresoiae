import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SvgContainer = styled.img`
  width: 100px;
  height: 25px;

  @media (min-width: 400px) {
    width: 150px;
    height: 35px;
  }
`;

ResponsiveSVG.propTypes = {
    url: PropTypes.string.isRequired,
    svg: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes
  };

const ReasponsiveSVG = ({ url, svg, alt = '' }) => (
  <Box>
    <a href={url} rel="noopener noreferrer" target="_blank">
      <SvgContainer src={svg} alt={alt} />
    </a>
  </Box>
);



export default Logo;