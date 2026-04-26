import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/list.css";

function LojaList() {
    const [loja, setLoja] = useState([]);

    useEffect(() => {
        const procurarLoja = async () => {
            try {
                const resposta = await api.get("/loja");
                setLoja(resposta.data);
            } catch (error) {
                console.error(error);
            }
        };

        procurarLoja();
    }, []);

    return (
        <div>
            <h1>Lojas disponíveis</h1>

            {loja.length === 0 && <p>Loja não encontrada</p>}

            {loja.map((item) => (
                <div className="card" key={item._id}>
                    <h2>{item.nome}</h2>
                    <p>{item.cep}</p>
                </div>
            ))}
        </div>
    );
}

export default LojaList;