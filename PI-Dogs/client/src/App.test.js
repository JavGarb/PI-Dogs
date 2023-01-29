// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('muestra el titulo de la app', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/JavGarb PI-Dogs/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './components/footer/Footer';
import { Title } from './components/title/Title';


test('renders footer with correct text', () => {
  const { getByText } = render(<Footer />);
  
  expect(getByText('© Copyrigth Todos los derechos reservados')).toBeInTheDocument();
  expect(getByText('App realizada por Javier Garbalena')).toBeInTheDocument();
  });
 

  test('renders footer with correct text', () => {
    const { getByText } = render(<Title />);
    
    expect(getByText('Informacion de Razas y Caracteristicas de los Perros')).toBeInTheDocument();
    });
   