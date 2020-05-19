import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import api from '../../services/api'
import Header from '../header'


function UpdateEpisodio() {
    const navigate = useNavigate()
    let { id_episodio } = useParams()
    let [selectedFile, setFile] = useState('')
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [key, setKey] = useState('')
    let [anime, setAnime] = useState([])
    let [idanime, setIdanime] = useState(0)

    const updateEpisodio = async () => {
        const fd = new FormData();
        fd.append("titleEpisodio", title);
        fd.append("descriptionEpisodio", description);
        fd.append("keyEpisodio", key);
        fd.append("imgEpisodio", selectedFile, selectedFile.name);
        fd.append("idepisodio", id_episodio);

        api.patch(`/episodios/${id_episodio}`, fd)
            .then(response => {
                console.log(response)
                alert('Episódio alterado com sucesso!')
                navigate(`/gerir-episodios/${idanime}`)
            })
            .catch(error => {
                console.error(error)
                alert('Problema na atualização do episódio!')
            })
    }


    const loadEpisodio = async () => {
        const response = await api.get(`/episodios/${id_episodio}`)
        anime = response.data.response //Recebendo os dados do anime
        console.log(anime)

        setTitle(anime.titleEpisodio)
        setDescription(anime.titleEpisodio)
        setKey(anime.keyEpisodio)
        //Pega o id do anime
        setIdanime(anime.idanimes)

    }

    const fileSelectedHandler = e => {
        selectedFile = e.target.files[0]
        console.log(selectedFile)
    }

    useEffect(() => {
        loadEpisodio()
    }, [])

    return (
        <div>
            <Header />
            <div className="update-anime">

                <h2 style={{ color: "rgb(0, 155, 194)" }}>Atualizar dados de um episodio</h2><br></br>

                <TextField
                    style={{ width: "80vmin" }}
                    label="Título do episódio"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                <br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Key do episódio"
                    type="text"
                    name="key"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    required />
                <br></br><br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Descrição do episódio"
                    multiline
                    rows="4"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required />
                <br></br><br></br><br></br>

                Selecione a imagem do episodio <br></br><br></br>
                <div className="input-file">
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                    ><input
                            type="file"
                            onChange={fileSelectedHandler}
                        /></Button>

                </div>
                <br></br><br></br>

                <Button
                    style={{ marginRight: "5vmin" }}
                    type="submit"
                    variant="contained"
                    className="btn-atualiza"
                    color="primary"
                    onClick={() => updateEpisodio()}
                >Atualizar</Button>

                <Button
                    style={{ marginLeft: "5vmin" }}
                    variant="contained"
                    className="btn-cancel"
                    color="primary"
                    onClick={() => navigate(`/gerir-episodios/${idanime}`)}
                >Cancelar</Button>
            </div>
            <div>
                <h3> by Andriel Friedrich © </h3>
            </div>
        </div>

    )
}

export default UpdateEpisodio