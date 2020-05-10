import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import api from '../services/api'
import Header from './header'
import './inclusao.css'

export default class Incluir extends Component {
    state = {
        title: '',
        description: '',
        key: '',
        selectedFile: null
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    addAnime = (title, description, key) => {
        const fd = new FormData();
        fd.append("titleAnime", title);
        fd.append("keyAnime", key);
        fd.append("descriptionAnime", description);
        fd.append("imgAnime", this.state.selectedFile, this.state.selectedFile.name)


        api.post("/animes", fd)
            .then(response => console.log(response))
            .catch(error => console.log('error', error));
    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(e.target.files[0])
    }


    render() {
        const { title, description, key } = this.state
        return (
            <div>
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <div className="inclui-anime">

                        <h2>Inclusão de Anime</h2>
                        <TextField
                            label="Título do Anime"
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.changeHandler}
                            required />
                        <br></br><br></br>

                        <TextField
                            label="Descrição do Anime"
                            type="text"
                            name="description"
                            multiline
                            rows="4"
                            className="description"
                            variant="outlined"
                            value={description}
                            onChange={this.changeHandler}
                            required />
                        <br></br><br></br>
                        <TextField
                            label="Key do Anime"
                            type="text"
                            name="key"
                            className="key"
                            value={key}
                            onChange={this.changeHandler}
                            required />

                        <br></br><br></br>
                        Selecione a imagem do Anime <br></br><br></br>
                        <div className="input-file">
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            ><input
                                    type="file"
                                    onChange={this.fileSelectedHandler}
                                /></Button>

                        </div>
                        <br></br><br></br>

                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            onClick={() => {
                                if (title !== '' && description !== '') {
                                    this.addAnime(title, description, key)
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