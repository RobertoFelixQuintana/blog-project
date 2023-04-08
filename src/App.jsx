import React from 'react';
import initDayjs from '../src/helpers/configDayjs';
import Container from './components/Container/Container';

function App() {
  React.useEffect(() => {
    initDayjs();
  }, []);

  return (
    <Container>
      <h1>Datos de la empresa:</h1>

      <h2>Estadisticas de problemas:</h2>

      <h2>Estadisticas de publicaciones:</h2>
    </Container>
  );
}

export default App;
