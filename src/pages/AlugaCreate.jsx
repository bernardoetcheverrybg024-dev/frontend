import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/form.css";

function AlugaCreate() {
  const [cartao, setCartao] = useState("");
  const [numero, setNumero] = useState("");
  const [senha, setSenha] = useState("");
  const [loja, setLoja] = useState("");
  const [lojas, setLojas] = useState([]);

  
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await api.get("/loja");

        setLojas(response.data.lojas);

      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
      }
    };

    fetchLojas();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/alugar", {
        cartao,
        numero,
        senha,
        loja 
      });

      console.log("Resposta:", response.data);

      setCartao("");
      setNumero("");
      setSenha("");
      setLoja("");

      alert("Aluguel criado com sucesso!");
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      alert("Erro ao criar aluguel.");
    }
  };

  return (
    <div className="create-container">
      <h2>Criar Aluguel</h2>

      <form className="create-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <label>Cartão</label>
          <input
            type="text"
            value={cartao}
            onChange={(e) => setCartao(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Número</label>
          <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Loja</label>
          <select
            value={loja}
            onChange={(e) => setLoja(e.target.value)}
            required
          >
            <option value="">Selecione uma loja</option>

            {lojas.map((l) => (
              <option key={l._id} value={l._id}>
                {l.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row button-row">
          <button type="submit">Criar</button>
        </div>

      </form>
    </div>
  );
}

export default AlugaCreate;