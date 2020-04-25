import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../services/api'
import Header from './header'
import './inclusao.css'

export default class Incluir extends Component {
    state = {
        title: '',
        description: ''
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
    }


    addAnime = (title, description) => {
        api.post('/animes', {
            title: title,
            description: description
        })
            .then(response => {
                console.log(response.config.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const { title, description } = this.state
        return (
            <div>
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <div className="inclui-anime">

                        <h2>Inclusão de Anime</h2>
                        <TextField label="Título do Anime" type="text" name="title" value={title} onChange={this.changeHandler} required /><br></br>
                        <TextField label="Descrição do Anime" type="text" name="description" value={description} onChange={this.changeHandler} required /><br></br><br></br>
                        <Button variant="contained" type="submit" color="primary" onClick={() => {
                            if (title !== '' && description !== '') {
                                this.addAnime(title, description)
                                alert('Anime adicionado!')
                                this.setState({ title: '', description: '' })
                            } else {
                                console.log('Preencha todos os campos')
                            }

                        }}>Incluir anime</Button>
                    </div>
                    <div>
                        <h3> by Andriel Friedrich © </h3>
                    </div>
                </form>
            </div>

        )
    }
}