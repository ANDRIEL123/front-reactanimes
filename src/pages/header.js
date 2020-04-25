import React from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'



const Header = () => {
    let navigate = useNavigate()
    return (
        <div>
            <a href="/dashboard" style={{ textDecoration: "none" }} onClick={() => navigate('/dashboard')}>
                <header id="main-header">Gestão React Animes</header>
            </a>
            <br></br>
        </div>
    )
}

export default Header