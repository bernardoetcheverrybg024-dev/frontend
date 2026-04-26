import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import AlugaList from "./pages/AlugaList";
import AlugaCreate from "./pages/AlugaCreate";
import AlugaEdit from "./pages/AlugaEdit";

import FilmeEdit from "./pages/FilmeEdit";
import FilmeList from "./pages/FilmeList";
import FilmeCreate from "./pages/FilmeCreate";

import LojaEdit from "./pages/LojaEdit";
import LojaList from "./pages/LojaList";
import LojaCreate from "./pages/LojaCreate";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Filmes</Link>
        <Link to="/filme/list">Lista Filmes</Link>
        <Link to="/filme/create">Criar filmes</Link>

        <Link to="/loja/list">Ver loja</Link>
        <Link to="/loja/create">Criar loja</Link>

        <Link to="/aluga/list">Alugar filme</Link>
        <Link to="/aluga/create">Criar cartão</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>HOME OK</h1>} />
        <Route path="/filme/list" element={<Navigate to="/filme/list" />} />

        <Route path="/aluga/list" element={<AlugaList />} />
        <Route path="/aluga/create" element={<AlugaCreate />} />
        <Route path="/aluga/edit/:id" element={<AlugaEdit />} />

        <Route path="/filme/list" element={<FilmeList />} />
        <Route path="/filme/edit/:id" element={<FilmeEdit />} />
        <Route path="/filme/create" element={<FilmeCreate />} />

        <Route path="/loja/list" element={<LojaList />} />
        <Route path="/loja/create" element={<LojaCreate />} />
        <Route path="/loja/edit/:id" element={<LojaEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;