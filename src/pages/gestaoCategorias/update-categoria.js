import React, { useState, useEffect } from 'react'
import Header from '../header'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { useParams, useNavigate, Link } from 'react-router-dom'

const pegaUrlAtual = () => {
    const url = window.location.href.split(window.location.pathname)
    return url[0]
}

const gerirRotas = (rota) => {
    window.location.href = pegaUrlAtual() + rota
}

function UpdateCategoria() {
    const navigate = useNavigate()
    let { id_categoria } = useParams()
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [categorias, setCategorias] = useState([])

    const loadCategorias = async () => {
        const response = await api.get(`/categorias/${id_categoria}`)
        setCategorias(response.data.response[0])
        setTitle(response.data.response[0].titleCategoria)
        setDescription(response.data.response[0].descriptionCategoria)
    }

    useEffect(() => {
        loadCategorias()
    }, [])

    const updateCategoria = async () => {
        if (title !== '') {
            const response = await api.patch(`/categorias/${id_categoria}`, {
                titleCategoria: title,
                descriptionCategoria: description
            })
            if (response.status = 200) {
                alert('Categoria atualizada com sucesso!')
                navigate('/gerir-categorias')
            } else {
                alert('Problema na atualização de categoria.')
            }
        } else {
            alert('Preencha ao menos o título')
        }
    }

    return (
        <div className="update-categoria">
            <Header />
            <h2>Atualização de Categoria</h2>

            <form method="POST">
                <TextField
                    style={{ width: "80vmin" }}
                    label="Título da Categoria"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                <br></br><br></br>
                <TextField
                    style={{ width: "80vmin" }}
                    label="Description da Categoria"
                    type="text"
                    multiline
                    rows="4"
                    variant="outlined"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <br></br><br></br>
                <Button
                    style={{ marginRight: "5vmin" }}
                    variant="contained"
                    className="btn-atualizar"
                    color="primary"
                    onClick={() => updateCategoria()}

                >Atualizar</Button>
                <Link to="/gerir-categorias">
                    <Button
                        style={{ marginLeft: "5vmin" }}
                        variant="contained"
                        className="btn-cancel"
                        color="primary"
                        onClick={() => navigate(`/gerir-episodios/${id_categoria}`)}
                    >Cancelar</Button>
                </Link>
            </form>
        </div>
    )
}

export default UpdateCategoria
