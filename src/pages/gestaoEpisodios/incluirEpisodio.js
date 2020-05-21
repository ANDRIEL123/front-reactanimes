import React, { useState } from 'react'
import Header from '../header'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const pegaUrlAtual = () => {
    const url = window.location.href.split(window.location.pathname)
    return url[0]
}

const gerirRotas = (rota) => {
    window.location.href = pegaUrlAtual() + rota
}

function IncluirEpisodio() {
    const navigate = useNavigate()
    let { id_anime } = useParams()
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [key, setKey] = useState('')
    let [selectedFile, setSelectedFile] = useState(null)

    const fileSelectedHandler = e => {
        selectedFile = e.target.files[0]
        console.log(selectedFile)
    }

    const addEpisodio = () => {
        //FAZ ISSO SE TIVER UM ARQUIVO SELECIONADO
        if (selectedFile) {
            const fd = new FormData();
            fd.append("titleEpisodio", title);
            fd.append("descriptionEpisodio", description);
            fd.append("keyEpisodio", key);
            fd.append("imgEpisodio", selectedFile, selectedFile.name);
            fd.append("idanime", id_anime);

            api.post(`/episodios`, fd)
                .then(response => {
                    console.log(response)
                    let confirma = window.confirm('Episodio adicionado, deseja adicionar outro?')
                    if (confirma) {
                        gerirRotas(`/incluir-episodio/${id_anime}`)
                    } else {
                        navigate(`/gerir-episodios/${id_anime}`)
                    }

                })

                .catch(error => {
                    console.error(error)

                })
        } else {
            api.post('/episodios', {
                titleEpisodio: title,
                descriptionEpisodio: description,
                keyEpisodio: key,
                idanime: id_anime
            })
                .then(function (response) {
                    console.log(response);
                    let confirma = window.confirm('Episodio adicionado, deseja adicionar outro?')
                    if (confirma) {
                        gerirRotas(`/incluir-episodio/${id_anime}`)
                    } else {
                        navigate(`/gerir-episodios/${id_anime}`)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <div className="incluir-episodio">
            <Header />
            <h2>Inclusão de episódio</h2>

            <form method="POST">
                <TextField
                    style={{ width: "80vmin" }}
                    label="Título do Anime"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                <br></br><br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Description do Anime"
                    type="text"
                    multiline
                    rows="4"
                    variant="outlined"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required />
                <br></br><br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Key do Anime"
                    type="text"
                    name="key"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    required />
                <br></br><br></br>
                <div className="input-file">
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                    ><input
                            id="input-file"
                            type="file"
                            onChange={fileSelectedHandler}
                        /></Button>

                </div>
                <br></br><br></br>

                <Button
                    style={{ marginRight: "5vmin" }}
                    variant="contained"
                    className="btn-incluir"
                    color="primary"
                    onClick={() => addEpisodio()}
                >Incluir</Button>

                <Button
                    style={{ marginLeft: "5vmin" }}
                    variant="contained"
                    className="btn-cancel"
                    color="primary"
                    onClick={() => navigate(`/gerir-episodios/${id_anime}`)}
                >Cancelar</Button>
            </form>
        </div>
    )
}

export default IncluirEpisodio
