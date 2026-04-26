import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css"

function AlugaEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cartao, setCartao] = useState("");
    const [numero, setNumero] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/alugar");
                const user = response.data.find((u) => u._id === id);

                if (user) 
                {
                    setCartao(user.cartao);
                    setNumero(user.numero);
                }
            } catch (error) {
                console.error("Erro ao carregar pedido: ", error);
            }
        };
        fetchUser();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/alugar/${id}`,
                {
                    cartao: cartao,
                    numero: numero,
                    password: password,
                });

                alert("Pedido atualizado com sucesso!");
                navigate("/");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar pedido");
        }
    }

    return (
        <div className="create-container">
            <h2>Editar Pedido</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome do cartão:</label>
                    <input type="text"
                    value={cartao} 
                    onChange={(e) => setCartao(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Número do cartão:</label>
                    <input type="password"
                    value={numero} 
                    onChange={(e) => setNumero(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Nova Senha:</label>
                    <input type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default AlugaEdit;