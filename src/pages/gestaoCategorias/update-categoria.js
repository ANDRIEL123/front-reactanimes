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
    let [categoriasSelected, setCategoriasSelected] = useState([])
    let [checked, setChecked] = useState(false)

    const handleChangeChecked = e => {
        let auxArray = categoriasSelected

        this.setState({ checked: e.target.checked })
        console.log(e.target.value)
        if (e.target.checked) {
            this.setState({ checked: true })
            auxArray.push(e.target.value)
            console.log(`Checked é ${true}`)
            this.setState({ categoriasSelected: auxArray })
        } else {
            this.setState({ checked: false })
            console.log(`Checked é ${false}`)
            if (auxArray.length === 1) {
                auxArray.pop()
            } else {
                auxArray.splice(1, auxArray.indexOf(e.target.value))
            }
            this.setState({ categoriasSelected: auxArray })
        }
    }

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
            if (response.status === 200) {
                alert('Categoria atualizada com sucesso!')
                gerirRotas('/gerir-categorias')
            } else {
                alert('Problema na atualização de categoria.')
            }
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
                    type="submit"
                >Atualizar</Button>
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

export default UpdateCategoria
