import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';
import LinkAnimated from './LinkAnimated';

const RouteLink = ({ onClick, selected, children }) => (
  <Box ml={[2, 3]} color="background" fontSize={[1, 2]}>
    <LinkAnimated onClick={onClick} selected={selected}>
      {children}
    </LinkAnimated>
  </Box>
);

RouteLink.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  children: PropTypes.node,
};

export default RouteLink;
