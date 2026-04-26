import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function LojaEdit() {
  const { id } = useParams();


  const [loja, setLoja] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    const data = async () => {
      try {
        const res = await api.get(`/loja/${id}`);
        setLoja(res.data.loja);
        setNome(res.data.nome);
        setCep(res.data.cep);
      } catch (error) {
        console.error("erro no codigo", error);
      }
    };

    data();
  }, [id]);

  const submitFacilitado = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitFacilitado}>
        <div>
          <label>Edite o nome da loja</label>
          <input
            placeholder="digite o novo nome da loja aqui"
            type="text"
            value={loja}
            onChange={(e) => setLoja(e.target.value)}
          />
        </div>

        <div>
          <label>Digite o novo CEP da loja</label>
          <input
            placeholder="digite aqui o novo CEP da sua loja"
            type="number"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>

        <div>
          <label>Digite o novo nome da rua da sua loja</label>
          <input
            placeholder="digite o novo nome da rua"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default LojaEdit;