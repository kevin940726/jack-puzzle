import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ pos, id, visible, image }) => {
  const x = pos % 3;
  const y = parseInt(pos / 3, 10);
  const u = id % 3;
  const v = parseInt(id / 3, 10);
  return (
    <div
      className="grid" style={{
        transform: `translate(${x * 100}px, ${y * 100}px)`,
        display: visible ? 'block' : 'none',
      }}
    >
      <div
        className="img" style={{
          transform: `translate(-${u * 100}px, -${v * 100}px)`,
          backgroundImage: `url('${image}')`,
        }}
      />
    </div>
  );
};

Grid.propTypes = {
  pos: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool,
  image: PropTypes.string.isRequired,
};

export default Grid;
