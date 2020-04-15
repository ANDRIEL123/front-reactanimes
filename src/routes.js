import React from 'react'
import Login from './components/login/login'
import Menu from './pages/menu'

import {
    Routes, Route
} from 'react-router-dom'

export default function mainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Menu />} />
        </Routes>
    )
}