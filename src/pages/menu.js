import React, { Component } from 'react'
import api from '../services/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Modal from 'react-modal'
import Header from './header'
import './menu.css'

const customStyleModal = {
    content: {
        "display": "block",
        "background": "rgb(77, 76, 76)",
        "border": "solid rgb(35, 97, 155) 5px",
    }
}

Modal.setAppElement("#root")

/*
const viewLocalStorage = () => {
    console.log(sessionStorage.getItem('user'))
    console.log(sessionStorage.getItem('password'))
}
*/

export default class Menu extends Component {
    state = {
        animes: [],
        animesAux: [],
        search: '',
        title: '',
        description: '',
        modalIsOpen: false
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    loadAnimesApi = async () => {
        const response = await api('/animes')
        this.setState({ animes: response.data.response, animesAux: response.data.response })
    }

    componentDidMount() {
        this.loadAnimesApi()
    }

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    filterAnimes = (animes, query) => {
        var filteredArray = animes.filter(anime => {
            return anime.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        this.setState({ animesAux: filteredArray })
    };

    removerAnime = (anime, index) => {
        const { animesAux } = this.state
        api.delete(`/animes/${anime.id_anime}`)
            .then(response => {
                animesAux.splice(index, 1)
                this.setState({ animesAux: animesAux })

                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateAnime = (anime, index) => {
        const { title, description, animesAux } = this.state
        if (title !== '' && description !== '') {
            api.patch(`/animes/${anime.id_anime}`, {
                title: title,
                description: description
            })
            animesAux[index].title = title
            animesAux[index].description = description
            this.setState({ animesAux: animesAux })
            alert('Anime atualizado!')
            this.setState({ modalIsOpen: false })

        }
    }

    gerirAnimes = () => {

        window.location.href = this.pegaUrlAtual() + "/gerir-episodios"
    }

    render() {
        const { animes, animesAux, search, title, description, modalIsOpen } = this.state
        return (

            <div className="main-menu">
                <Header />
                <div>
                    <Button variant="contained"
                        type="submit"
                        color="primary"
                        onClick={() => window.location.href = this.pegaUrlAtual() + "/incluir-anime"}
                    >Incluir um novo anime</Button>
                </div>
                <div className="search">
                    <TextField label="Pesquise um anime"
                        onKeyDown={(event) => { if (event.keyCode === 13) { this.filterAnimes(animes, search) } }}
                        type="text"
                        onChange={this.handleChangeSearch.bind(this)} />
                    <Button variant="contained" type="submit" color="primary" onClick={() => this.filterAnimes(animes, search)} >Pesquisar anime</Button>
                </div>


                <div className="animes">
                    <h2>Listagem dos Animes</h2>

                    {animesAux.map((anime, index) => (
                        <div className="list-animes" key={anime}>
                            <h3>{anime.title}</h3>
                            <p>{anime.description}</p>
                            <div className="buttons">
                                <Button variant="contained" className="btn-edit" type="submit" color="primary"
                                    onClick={() => this.setState({ modalIsOpen: true, title: anime.title, description: anime.description })}
                                >Editar</Button>
                                {/*  Modal de atualização de animes usando react-modal */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    style={customStyleModal}
                                    contentLabel={"Atualiza anime"}
                                >
                                    <center>
                                        <form onSubmit={this.handleSubmit}>
                                            <h2 style={{ color: "rgb(0, 155, 194)" }}>Atualizar dados de uma anime</h2><br></br>

                                            <TextField style={{ width: "80vmin" }} label="Título do Anime" type="text" name="title"
                                                value={title} onChange={this.changeHandler} required />
                                            <br></br>
                                            <TextField style={{ width: "80vmin" }} label="Descrição do Anime" type="text" name="description"
                                                value={description} onChange={this.changeHandler} required />
                                            <br></br><br></br><br></br>

                                            <Button style={{ marginRight: "5vmin" }} type="submit" variant="contained" className="btn-atualiza" color="primary"
                                                onClick={() => this.updateAnime(anime, index)}
                                            >Atualizar</Button>
                                            <Button style={{ marginLeft: "5vmin" }} variant="contained" className="btn-cancel" color="primary"
                                                onClick={() => this.setState({ modalIsOpen: false })}
                                            >Cancelar</Button>
                                        </form>
                                    </center>
                                </Modal>
                                {/* Gestão dos episodios */}
                                <Button
                                    variant="contained"
                                    className="btn-gerir"
                                    color="primary"
                                    onClick={() => this.gerirAnimes()} >Gerir Episodios
                                </Button>

                                <Button variant="contained" className="btn-rem" color="primary" onClick={() => {
                                    let confirma = window.confirm("Você deseja realmente remover esse anime e todos os seus episódios?")
                                    if (confirma) {
                                        this.removerAnime(anime, index)
                                    }
                                }} >Remover</Button>


                            </div>
                        </div>

                    ))}
                    <div className="pages-animes">
                        <Button variant="contained" className="btn-ant" type="submit" color="primary" onClick={"#"} >Página anterior</Button>
                        <Button variant="contained" className="btn-prox" type="submit" color="primary" onClick={"#"} >Próxima Página</Button>
                    </div>
                    <div>
                        <h3> by Andriel Friedrich © </h3>
                    </div>

                </div>
            </div >


        )
    }
}