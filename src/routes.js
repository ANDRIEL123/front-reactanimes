import React from 'react'
import Login from './components/login/login'
import Menu from './pages/menu'
import Autentifica from './erroAutentification'
import Inclusao from './pages/inclusao'
import Header from './pages/header'
import Update from './pages/updateAnime'
import GestaoEpisodios from './pages/gestaoEpisodios/gestaoEpisodios'
import IncluirEpisodio from './pages/gestaoEpisodios/incluirEpisodio'
import UpdateEpisodio from './pages/gestaoEpisodios/updateEpisodio'
import GestaoCategorias from './pages/gestaoCategorias/gestaoCategorias'
import IncluirCategoria from './pages/gestaoCategorias/incluir-categoria'
import UpdateCategoria from './pages/gestaoCategorias/update-categoria'

import {
    Routes, Route
} from 'react-router-dom'

const autentificaRota = () => {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('password')) {
        return < Menu />
    } else {
        return < Autentifica />
    }
}

export default function mainRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/dashboard" element={autentificaRota()} />
                <Route path="/incluir-anime" element={< Inclusao />} />
                <Route path="/gerir-episodios/:id_anime" element={<GestaoEpisodios />} />
                <Route path="/update-animes/:id_anime" element={<Update />} />
                <Route path="/incluir-episodio/:id_anime" element={<IncluirEpisodio />} />
                <Route path="/update-episodio/:id_episodio" element={<UpdateEpisodio />} />
                <Route path="/gerir-categorias" element={<GestaoCategorias />} />
                <Route path="/incluir-categoria" element={<IncluirCategoria />} />
                <Route path="/update-categoria/:id_categoria" element={<UpdateCategoria />} />


            </Routes>
        </div>
    )
}