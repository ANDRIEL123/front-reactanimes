import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../header'
import TextField from '@material-ui/core/TextField'
import api from '../../services/api'
import './gestao.css'

function GestaoEpisodios() {
    const navigate = useNavigate()
    let { id_anime } = useParams()
    let [episodios, setEpisodios] = useState([])
    let [episodiosAux, setEpisodiosAux] = useState([])
    let [titleAnime, setTitleAnime] = useState('')
    let [query, setQuery] = useState('')
    const loadEpisodios = async () => {
        const response = await api.get(`/episodios/animes/${id_anime}`)
        const responseAnime = await api.get(`/animes/${id_anime}`)
        setEpisodios(response.data.response)
        setEpisodiosAux(response.data.response)
        setTitleAnime(responseAnime.data.response.titleAnime)
        console.log(response.data.response)
    }

    useEffect(() => {
        loadEpisodios()
    }, [])

    const removerEpisodio = (idepisodio, index, idanime) => {
        api.delete(`/episodios/${idepisodio}`)
            .then(response => {
                episodiosAux.splice(index, 1)
                setEpisodiosAux(episodiosAux)
                navigate(`/gerir-episodios/${idanime}`)

                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const filterEpisodios = () => {
        var filteredArray = episodios.filter(ep => {
            return ep.titleEpisodio.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        setEpisodiosAux(filteredArray)
    };

    const baseUrlUploads = (imagem) => {
        return `${process.env.REACT_APP_API_URL}/uploads/${imagem}`
    }

    return (
        <div className="main-gestaoEpisodios">
            <Header />
            <h2>{`Gestão do anime - ${titleAnime}`}</h2>

            <div>
                <Button variant="contained"
                    type="submit"
                    color="primary"
                    onClick={() => navigate(`/incluir-episodio/${id_anime}`)}
                >Incluir um novo Episódio</Button>
            </div>
            <br></br>
            <div className="search">
                <TextField
                    label="Pesquise episodio"
                    onKeyDown={(event) => { if (event.keyCode === 13) { filterEpisodios() } }}
                    type="text"
                    onChange={e => setQuery(e.target.value)}
                />
                <Button variant="contained" type="submit" color="primary" onClick={() => filterEpisodios()} >Pesquisar episódio</Button>
            </div>
            <br></br>
            {
                episodiosAux.map((ep, index) => (
                    <div className="separa-episodio" key={ep.key}>
                        <img src={baseUrlUploads(ep.imgEpisodio)} type="" width="125px" height="100px" />
                        <p><b>{ep.titleEpisodio}</b></p>
                        <p>{ep.descriptionEpisodio}</p>
                        <br />
                        <Button variant="contained"
                            style={{ marginRifgt: "15vmin" }}
                            type="submit"
                            color="primary"
                            onClick={() => navigate(`/update-episodio/${ep.idepisodios}`)}
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
                ))
            }
        </div >
    )
}

export default GestaoEpisodios