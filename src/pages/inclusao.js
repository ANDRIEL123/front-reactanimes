import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './inclusao.css'

export default class Incluir extends Component {
    state = {
        title: '',
        description: ''
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <div className="inclui-anime">
                    <h2>Inclusão de Anime</h2>
                    <TextField label="Título do Anime" type="text" onChange={this.changeHandler} /><br></br>
                    <TextField label="Descrição do Anime" type="text" onChange={this.changeHandler} /><br></br><br></br>
                    <Button variant="contained" type="submit" color="primary" onClick={""} >Incluir anime</Button>
                </div>
                <div>
                    <h3> by Andriel Friedrich © </h3>
                </div>
            </div>

        )
    }
}