import React from 'react';
import { useSelector } from 'react-redux';
import { getAllTables } from '../redux/tableReducer';
import { Spinner } from 'react-bootstrap';
import TableOverview from './TableOverview';

const Home = () => {
    const tables = useSelector(getAllTables);

  if (!tables || !tables.length) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  } else {
    return (
      <div>
        <h4>All Tables List</h4>
        <ul>
          {tables.map(table => (
            <TableOverview
              key={table.id}
              id={table.id}
              status={table.status}
            />
          ))}
        </ul>
        {}
      </div>
    ); 
  }
};

export default Home;
