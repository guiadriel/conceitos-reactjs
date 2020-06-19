import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const newRepository = await api.post('/repositories', {
      "title":`ReactJS ${Date.now()}`,
      "url":"http://github.com/guiadriel",
      "techs": [
        "ReactJS",
        "NodeJS",
      ]
    });

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const repositoryIndex = repositories.find(repository => id === repository.id );
    if( repositoryIndex < 0 ){
      alert('Não foi possível remover');
    }

    const removeRepository = await api.delete(`/repositories/${id}`);

    if (removeRepository.status === 204) {
      const listReps = repositories.filter(repository => id !== repository.id);
      setRepositories(listReps);
    }
  }

  useEffect(() => {
    api.get('/repositories').then(response =>{
        setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
