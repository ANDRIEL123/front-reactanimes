import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../header'
import api from '../../services/api'
import './gestao.css'

function GestaoEpisodios() {
    const navigate = useNavigate()
    let { id_anime } = useParams()
    let [episodios, setEpisodios] = useState([])

    const loadEpisodios = async () => {
        const response = await api.get(`/episodios/animes/${id_anime}`)
        setEpisodios(response.data.response)
    }

    useEffect(() => {
        loadEpisodios()
    }, [])

    const removerEpisodio = (idepisodio, index, idanime) => {
        api.delete(`/episodios/${idepisodio}`)
            .then(response => {
                episodios.splice(index, 1)
                setEpisodios(episodios)
                navigate(`/gerir-episodios/${idanime}`)

                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="main-gestaoEpisodios">
            <Header />
            <h2>Gestão do Anime</h2>
            <div>
                <Button variant="contained"
                    type="submit"
                    color="primary"
                    onClick={"x"}
                >Incluir um novo Episódio</Button>
            </div>
            <br></br>
            {episodios.map((ep, index) => (
                <div className="separa-episodio" key={ep.key}>

                    <p><b>{ep.titleEpisodio}</b></p>
                    <p>{ep.descriptionEpisodio}</p>
                    <br />
                    <Button variant="contained"
                        style={{ marginRifgt: "15vmin" }}
                        type="submit"
                        color="primary"
                        onClick={"x"}
                    >Editar</Button>
                    <Button variant="contained"
                        style={{ marginLeft: "15vmin" }}
                        type="submit"
                        color="primary"
                        onClick={() => {
                            let confirma = window.confirm("Você deseja realmente remover esse episódio?")
                            if (confirma) {
                                removerEpisodio(ep.idepisodios, index, ep.idanimes)
                            }
                        }}
                    >Remover</Button>
                    <br /><br />

                </div>
            ))}
        </div>
    )
}

export default GestaoEpisodios