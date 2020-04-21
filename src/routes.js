import React from 'react'
import Login from './components/login/login'
import Menu from './pages/menu'
import Autentifica from './erroAutentification'
import Inclusao from './pages/inclusao'
import Header from './pages/header'

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
            <Header />
            <Routes>
                <Route path="/" element={< Login />} />
                <Route path="/dashboard" element={autentificaRota()} />
                <Route path="/incluir-anime" element={< Inclusao />} />
            </Routes>
        </div>
    )
}