import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTables } from './redux/tableReducer';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import { TableDetails } from './components/TableDetails';
import NotFound from './components/NotFound';
import { Container } from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<TableDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
