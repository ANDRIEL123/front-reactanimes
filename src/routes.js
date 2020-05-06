import React from 'react'
import Login from './components/login/login'
import Menu from './pages/menu'
import Autentifica from './erroAutentification'
import Inclusao from './pages/inclusao'
import Header from './pages/header'
import Update from './pages/updateAnime'
import GestaoEpisodios from './pages/gestaoEpisodios'

import {
    Routes, Route
} from 'react-router-dom'

const autentificaRota = () => {
    if (sessionStorage.getItem('user') === 'admin' && sessionStorage.getItem('password') === 'root') {
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
                <Route path="/gerir-episodios" element={<GestaoEpisodios />} />
                <Route path="/update-animes/:id_anime" element={<Update />} />
            </Routes>
        </div>
    )
}