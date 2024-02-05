import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (
    <footer className="bg-primary text-center text-white mt-2">
      <Container className="p-3">
        Copyright @ PizzeriaApp 2024
      </Container>
    </footer>
  );
};

export default Footer;
