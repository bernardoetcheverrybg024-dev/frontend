import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function FilmeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [ano, setAno] = useState("");
    const [opiniao, setOpiniao] = useState("");

    useEffect(() => {
        const filme = async () => {
            try {
                const response = await api.get(`/filme/${id}`);

                setNome(response.data.nome);
                setSinopse(response.data.sinopse);
                setAno(response.data.ano);
                setOpiniao(response.data.opiniao);
            } catch (error) {
                console.error("Erro ao carregar filme: ", error);
            }
        };

        filme();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/filme/${id}`, {
                nome,
                sinopse,
                ano,
                opiniao
            });

            navigate("/filme");
        } catch (error) {
            console.error("Erro ao salvar filme:", error);
        }
    };

    return (
        <div className="create-container">

            <h2>Editar Filme</h2>

            <form className='form' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label>Nome do filme</label>
                    <input
                        placeholder="Digite o nome do filme"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className='form-row'>
                    <label>Sinopse</label>
                    <textarea
                        placeholder="Digite a sinopse do filme"
                        value={sinopse}
                        onChange={(e) => setSinopse(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Ano de lançamento</label>
                    <input
                        type="number"
                        placeholder="Digite o ano do filme"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
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

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default FilmeEdit;