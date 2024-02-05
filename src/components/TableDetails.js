
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTableById, editTableRequest } from '../redux/tableReducer';
import { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TableDetails = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const tableData = useSelector(state => getTableById(state, parseInt(tableId)));
  const dispatch = useDispatch();

  const [table, setTable] = useState({
    status: '',
    peopleAmount: 0,
    maxPeopleAmount: 0,
    bill: 0,
  });

  useEffect(() => {
    if (tableData) {
      setTable({
        ...tableData,
        peopleAmount: tableData.peopleAmount || 0,
        maxPeopleAmount: tableData.maxPeopleAmount || 0,
        bill: tableData.status === 'Busy' ? tableData.bill || 0 : 0,
      });
    }
  }, [tableData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTable(prev => ({
      ...prev,
      [name]: name === 'status' ? value : Math.max(0, Math.min(10, Number(value))),
    }));
    if (name === 'maxPeopleAmount' || name === 'status') {
      const newPeopleAmount = name === 'status' && (value === 'Cleaning' || value === 'Free') ? 0 : table.peopleAmount;
      setTable(prev => ({
        ...prev,
        peopleAmount: Math.min(prev.maxPeopleAmount, newPeopleAmount),
        bill: value !== 'Busy' ? 0 : prev.bill,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editTableRequest({ ...table, id: parseInt(tableId) }));
    navigate('/');
  };

  if (!tableData) return <Navigate to="/" />;

  return (
    <Form className="m-4" onSubmit={handleSubmit}>
      <h2>Table {tableId}</h2>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>Status</Form.Label>
        <Col sm={5}> {}
          <Form.Select name="status" value={table.status} onChange={handleChange}>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Busy">Busy</option>
            <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>People</Form.Label>
        <Col sm={5}> {}
          <Row>
            <Col>
              <Form.Control type="number" name="peopleAmount" value={table.peopleAmount} onChange={handleChange} disabled={table.status === 'Cleaning' || table.status === 'Free'} />
            </Col>
            <Col xs="auto">/</Col>
            <Col>
              <Form.Control type="number" name="maxPeopleAmount" value={table.maxPeopleAmount} onChange={handleChange} />
            </Col>
          </Row>
        </Col>
      </Form.Group>
      {table.status === 'Busy' && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Bill $</Form.Label>
          <Col sm={5}> {}
            <Form.Control type="number" name="bill" value={table.bill} onChange={handleChange} />
          </Col>
        </Form.Group>
      )}
      <Button type="submit">Update</Button>
    </Form>
  );
};

TableDetails.propTypes = {
  tableData: PropTypes.object,
};

export { TableDetails };
