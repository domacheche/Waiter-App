import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TableOverview = ({ id, status }) => {
  return (
    <li className="mb-3 d-flex justify-content-between align-items-center">
      <div>
        <h4>Table {id}</h4>
        <p>Status: {status}</p>
      </div>
      <Link to={`/table/${id}`}>
        <Button variant="primary">See More</Button>
      </Link>
    </li>
  );
};

TableOverview.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default TableOverview;
