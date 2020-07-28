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

const autentificaRota = (Componente) => {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('password')) {
        if (Componente === 'Menu') {
            return < Menu />
        }
        if (Componente === 'Inclusao') {
            return < Inclusao />
        }
        if (Componente === 'GestaoEpisodios') {
            return < GestaoEpisodios />
        }
        if (Componente === 'Update') {
            return < Update />
        }
        if (Componente === 'IncluirEpisodio') {
            return < IncluirEpisodio />
        }
        if (Componente === 'UpdateEpisodio') {
            return < UpdateEpisodio />
        }
        if (Componente === 'GestaoCategorias') {
            return < GestaoCategorias />
        }
        if (Componente === 'IncluirCategoria') {
            return < IncluirCategoria />
        }
        if (Componente === 'UpdateCategoria') {
            return < UpdateCategoria />
        }

    } else {
        return < Autentifica />
    }
}

export default function mainRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/dashboard" element={autentificaRota('Menu')} />
                <Route path="/incluir-anime" element={autentificaRota('Inclusao')} />
                <Route path="/gerir-episodios/:id_anime" element={autentificaRota('GestaoEpisodios')} />
                <Route path="/update-animes/:id_anime" element={autentificaRota('Update')} />
                <Route path="/incluir-episodio/:id_anime" element={autentificaRota('IncluirEpisodio')} />
                <Route path="/update-episodio/:id_episodio" element={autentificaRota('UpdateEpisodio')} />
                <Route path="/gerir-categorias" element={autentificaRota('GestaoCategorias')} />
                <Route path="/incluir-categoria" element={autentificaRota('IncluirCategoria')} />
                <Route path="/update-categoria/:id_categoria" element={autentificaRota('UpdateCategoria')} />
            </Routes>
        </div>
    )
}