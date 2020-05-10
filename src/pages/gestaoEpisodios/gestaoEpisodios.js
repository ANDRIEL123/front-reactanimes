import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function GestaoEpisodios() {
    let { id_anime } = useParams()

    return (
        <h2>Hello Gestao</h2>
    )
}

export default GestaoEpisodios