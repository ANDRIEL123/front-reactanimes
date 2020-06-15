import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useParams, useNavigate } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import api from '../services/api'
import Header from './header'
import './inclusao.css'


function Update() {
    const navigate = useNavigate()
    let { id_anime } = useParams()
    let [selectedFile, setFile] = useState('')
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [anime, setAnime] = useState([])
    let [date, setDate] = useState(2020)
    let [status, setStatus] = useState("Concluído")
    let [categorias, setCategorias] = useState([])

    const pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    const gerirRotas = (rota) => {
        window.location.href = this.pegaUrlAtual() + rota
    }

    const loadCategorias = async () => {
        const response = await api.get('/categorias')
        setCategorias(response.data.response)
    }

    const updateAnime = async (id_anime, description, title) => {
        if (selectedFile) {
            const fd = new FormData();
            fd.append("titleAnime", title);
            fd.append("descriptionAnime", description);
            fd.append("imgAnime", selectedFile, selectedFile.name)
            fd.append("situacaoAnime", status)
            fd.append("lancamentoAnime", date)

            api.patch(`/animes/${id_anime}`, fd)
                .then(function (response) {
                    console.log(response);
                    alert('Anime alterado com sucesso')
                    navigate(`/dashboard`)
                })
                .catch(error => console.error(error))
        } else {
            await api.patch(`/animes/${id_anime}`, {
                titleAnime: title,
                descriptionAnime: description,
                situacaoAnime: status,
                lancamentoAnime: date
            })
                .then(function (response) {
                    console.log(response);
                    alert('Anime alterado com sucesso')
                    navigate(`/dashboard`)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }


    const loadAnime = async () => {
        const response = await api.get(`/animes/${id_anime}`)
        anime = response.data.response //Recebendo os dados do anime
        setTitle(anime.titleAnime)
        setDescription(anime.descriptionAnime)
    }

    const fileSelectedHandler = e => {
        selectedFile = e.target.files[0]
        console.log(selectedFile)
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
                    label="Descrição do Anime"
                    multiline
                    rows="4"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required />
                <br></br><br></br><br></br>

                <TextField
                    id="date"
                    name="date"
                    onChange={e => setDate(e.target.value)}
                    label="Ano de Lançamento"
                    type="number"
                    value={date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <h3>Status do Anime</h3>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    name="status"
                >
                    <MenuItem value="" name="status">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Em Lançamento'}>Em Lançament</MenuItem>
                    <MenuItem value={'Cancelado'}>Cancelado</MenuItem>
                    <MenuItem value={'Concluído'} selected>Concluído</MenuItem>
                </Select>

                <h3>Categorias</h3>
                {categorias.map(value => (
                    <div className="categorias-anime">
                        <div className="check">
                            <Checkbox
                                onClick={this.handleChangeChecked}
                                className="check"
                                color="primary"
                                value={value.idcategorias}
                            />{value.titleCategoria}
                        </div>
                    </div>
                ))}

                Selecione a imagem do Anime <br></br><br></br>
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
                    onClick={() => updateAnime(id_anime, description, title)}
                >Atualizar</Button>

                <Button
                    style={{ marginLeft: "5vmin" }}
                    variant="contained"
                    className="btn-cancel"
                    color="primary"
                    onClick={() => navigate(`/dashboard`)}
                >Cancelar</Button>
            </div>
            <div>
                <h3> by Andriel Friedrich © </h3>
            </div>
        </div>

    )
}


export default Update