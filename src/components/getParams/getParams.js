import React from 'react';
import { useParams } from 'react-router-dom';

const getParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

export default getParams;
