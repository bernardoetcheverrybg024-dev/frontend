import { useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function FilmeCreate() {
  const [nome, setNome] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [ano, setAno] = useState("");
  const [opiniao, setOpiniao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/filme", {
        nome,
        sinopse,
        ano: Number(ano),
        opiniao
      });

      console.log("Resposta:", response.data);

      setNome("");
      setSinopse("");
      setAno("");
      setOpiniao("");

      alert("Filme criado com sucesso!");

    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      alert("Erro ao criar filme");
    }
  };

  return (
    <div className="create-container">
      <h2>Criar Filme</h2>

      <form className='form' onSubmit={handleSubmit}>

        <div className="form-row">
          <label>Nome do filme</label>
          <input
            type="text"
            placeholder="Digite o nome do filme"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-row"> {}
          <textarea
            placeholder="Digite a sinopse do filme"
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Ano de lançamento</label>
          <input
            placeholder='Digite o ano do filme'
            type='number'
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Opinião</label>
          <textarea
            placeholder="Deixe sua opinião sobre o filme"
            value={opiniao}
            onChange={(e) => setOpiniao(e.target.value)}
          />
        </div>

        <button type="submit">Criar Filme</button>
      </form>
    </div>
  );
}

export default FilmeCreate;