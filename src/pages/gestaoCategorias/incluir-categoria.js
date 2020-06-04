import React, { useState } from 'react'
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

function IncluirCategoria() {
    const navigate = useNavigate()
    let { id_anime } = useParams()
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')

    const addCategoria = async () => {
        if (title !== '') {
            const response = await api.post('/categorias', {
                titleCategoria: title,
                descriptionCategoria: description
            })
            if (response.status = 200) {
                let confirm = window.confirm('Categoria incluída com sucesso, deseja adicionar outra?')
                if (confirm) {
                    gerirRotas('/incluir-categoria')
                } else {
                    gerirRotas('/gerir-categorias')
                }
            } else {
                alert('Problema na inclusão de categoria.')
            }
        }
    }

    return (
        <div className="incluir-categoria">
            <Header />
            <h2>Inclusão de Categoria</h2>

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
                    className="btn-incluir"
                    color="primary"
                    onClick={() => addCategoria()}
                    type="submit"
                >Incluir</Button>
                <Link to="/gerir-categorias">
                    <Button
                        style={{ marginLeft: "5vmin" }}
                        variant="contained"
                        className="btn-cancel"
                        color="primary"
                    >Cancelar</Button>
                </Link>
            </form>
        </div>
    )
}

export default IncluirCategoria
