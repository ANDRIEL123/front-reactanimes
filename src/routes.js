import React from 'react'
import Login from './components/login/login'
import Menu from './pages/menu'
import Autentifica from './erroAutentification'

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
        <Routes>
            <Route path="/" element={< Login />} />
            <Route path="/dashboard" element={autentificaRota()} />
        </Routes>
    )
}