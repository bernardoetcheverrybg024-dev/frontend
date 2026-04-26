import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/list.css";

function FilmeList() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
   
    const fetchFilmes = async () => {
      try {
        const resposta = await api.get("/filme"); 
        console.log("DADOS DA API:", resposta.data);
        setFilmes(resposta.data);
      } catch (error) {
        console.error("ERRO:", error.response?.data || error.message);
      }
    };

    fetchFilmes(); 
  }, []); 
  return (
    <div>
      <h1>Lista de Filmes</h1>

      {filmes.length === 0 ? (
        <p>Nenhum filme encontrado</p>
      ) : (
        filmes.map((item) => (
          <div className="card" key={item._id}>
            <h2>{item.nome}</h2>
            <p>{item.sinopse}</p>
            <p><strong>Ano:</strong> {item.ano}</p>
            <p><strong>Opinião:</strong> {item.opiniao}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FilmeList;