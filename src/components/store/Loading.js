import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <div style={{ margin: '20px', marginTop: '100px', width: '100%' }}>
    <center>
      {' '}
      <CircularProgress />{' '}
    </center>
  </div>
);

export default Loading;
