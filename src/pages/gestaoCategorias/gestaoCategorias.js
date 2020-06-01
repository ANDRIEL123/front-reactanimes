import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Header from '../header'
import api from '../../services/api'
import './gestaoCategoria.css'


export default function GestaoCategorias() {
    let [categorias, setCategorias] = useState([])
    const loadCategorias = async () => {
        const response = await api.get('/categorias')
        setCategorias(response.data.response)
    }

    useEffect(() => {
        loadCategorias()
    }, [])

    const deleteCategoria = async (id) => {
        await api.delete(`/categorias/${id}`)
        loadCategorias()

    }


    return (
        <div className="main-categorias">
            <Header />
            <h2>Gestao categorias</h2>
            <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={""}
            >Incluir Categoria</Button>
            <div className="categorias">
                {categorias.map(categoria => (
                    <div className="cat">
                        <h4>{categoria.titleCategoria}</h4>
                        {console.log(categoria)}
                        <Button
                            style={{ marginRight: "2vmin" }}
                            variant="contained"
                            type="submit"
                            color="primary"
                            onClick={""}
                        >Editar</Button>

                        <Button
                            style={{ marginLeft: "2vmin" }}
                            variant="contained"
                            type="submit"
                            color="primary"
                            onClick={() => {
                                let confirm = window.confirm('Deseja realmente remover a categoria, os animes que possuem essa categoria referenciada irão perder esse vínculo!')
                                if (confirm) {
                                    deleteCategoria(categoria.idcategorias)
                                }
                            }}
                        >Remover</Button>
                    </div>
                ))}
            </div>
        </div>


    )
}