import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';
import LinkLang from './LinkLang';

const RouteLink = ({ onClick, children }) => (
  <Box ml={[2, 3]} color="background" fontSize={[2, 3]}>
    <LinkLang onClick={onClick}>
      {children}
    </LinkLang>
  </Box>
);

RouteLink.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default RouteLink;
