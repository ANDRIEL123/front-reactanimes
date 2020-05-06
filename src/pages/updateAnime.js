import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import api from '../services/api'
import Header from './header'
import './inclusao.css'


function Update() {
    const navigate = useNavigate()
    let { id_anime } = useParams()

    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [key, setKey] = useState('')
    let [anime, setAnime] = useState([])

    const updateAnime = async (id_anime, description, title, key) => {
        const response = await api.patch(
            `/animes/${id_anime}`,
            {
                descriptionAnime: description,
                titleAnime: title,
                keyAnime: key
            }
        )
        if (response.status === 200) {
            alert('Anime atualizado com sucesso!')
            navigate('/dashboard')

        } else {
            alert('Problema na atualização do anime.')
        }
    }

    const loadAnime = async () => {
        const response = await api.get(`/animes/${id_anime}`)
        anime = response.data.response //Recebendo os dados do anime
        setTitle(anime.titleAnime)
        setDescription(anime.descriptionAnime)
        setKey(anime.keyAnime)
    }

    useEffect(() => {
        loadAnime()
    }, [])

    return (
        <div>
            <Header />
            <div className="update-anime">

                <h2 style={{ color: "rgb(0, 155, 194)" }}>Atualizar dados de uma anime</h2><br></br>

                <TextField
                    style={{ width: "80vmin" }}
                    label="Título do Anime"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                <br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Key"
                    type="text"
                    name="key"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    required />
                <br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Descrição do Anime"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required />
                <br></br><br></br><br></br>

                <Button
                    style={{ marginRight: "5vmin" }}
                    type="submit"
                    variant="contained"
                    className="btn-atualiza"
                    color="primary"
                    onClick={() => updateAnime(id_anime, description, title, key)}
                >Atualizar</Button>
            </div>
            <div>
                <h3> by Andriel Friedrich © </h3>
            </div>
        </div>

    )
}


export default Update