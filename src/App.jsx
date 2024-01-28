import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [retorno, setRetorno] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    function loadApi(page) {
      const url = `https://rickandmortyapi.com/api/character?page=${page}`;
      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          setRetorno(json.results);
        });
    }
    loadApi(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="container">
        <h1>Rick And Morty API</h1>
        <small>Feito por TonDevPy</small>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Voltar
          </button>
          <span>
            Page{' '}
            <span
              style={currentPage === 1 ? { color: 'red' } : { color: 'blue' }}
            >
              {currentPage}
            </span>
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={retorno.length < itemsPerPage}
          >
            Próxima
          </button>
        </div>

        <div className="content">
          {retorno.map((element, index) => (
            <div className="card" key={index}>
              <img src={element.image} alt="" />
              <strong>Name: {element.name} 🚀</strong>
              <strong>
                Status: {element.status}{' '}
                {element.status === 'Alive' ? '🌟' : '💔'}
              </strong>
              <strong>Species: {element.species} 🐾</strong>
              <strong>
                Gender: {element.gender}{' '}
                {element.gender === 'Male' ? '👨' : '👩'}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
