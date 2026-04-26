import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list.css";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/alugar");

            
            setUsers(response.data.alugas);

        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este cartão?");

        if (!confirmDelete) return;

        try {
            await api.delete(`/alugar/${id}`);
            fetchUsers();
            alert("Cartão excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir: ", error);
            alert("Erro ao excluir cartão");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Cartões</h1>

            {users.length === 0 && <p>Nenhum cartão cadastrado.</p>}

            {users.map((user) => (
                <div className="card" key={user._id}>
                    <div>
                        <h2>{user.cartao}</h2>
                        <p>{user.numero}</p>
                    </div>

                    <div className="actions">
                        <Link to={`/edit/${user._id}`}>
                            <button className="edit-btn">Editar</button>
                        </Link>

                        <button
                            className="delete-btn"
                            onClick={() => deleteUser(user._id)}
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;