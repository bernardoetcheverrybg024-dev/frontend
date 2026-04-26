import { useState } from 'react';
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";

function LojaCreate() {
  const [loja, setLoja] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/loja", {
        loja,
        nome,
        cep: Number(cep)
      });

      console.log("Resposta:", response.data);

      setLoja("");
      setNome("");
      setCep("");

      alert("Loja criada com sucesso!");

      navigate("/loja");

    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      alert("Erro ao criar loja");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>Criar sua Loja</label>
          <input
            placeholder="digite sobre o que é sua loja"
            type="text"
            value={loja}
            onChange={(e) => setLoja(e.target.value)}
            required
          />
        </div>

        <div>
          <label>digite seu CEP</label>
          <input
            placeholder="digite seu CEP aqui"
            type="number"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>

        <div>
          <label>digite o nome da rua da sua loja</label>
          <input
            placeholder="digite aqui o nome da rua onde fica sua loja"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <button type="submit">Criar Loja</button>
      </form>

      <Link to="/loja">Voltar para a lista de lojas</Link>
    </div>
  );
}

export default LojaCreate;