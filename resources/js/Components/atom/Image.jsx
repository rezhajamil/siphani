import React from 'react';

const Images = ({ src, alt, width, height }) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default Images;
