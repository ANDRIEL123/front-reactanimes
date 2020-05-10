import React, { Component } from 'react'
import api from '../services/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Update from './updateAnime'
import Header from './header'
import './menu.css'
import Img from './wallpaper_batman-JS.png'


export default class Menu extends Component {
    state = {
        animes: [],
        animesAux: [],
        search: '',
        title: '',
        description: '',
        key: '',
        loadImg: null
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    loadAnimesApi = async () => {
        const response = await api('/animes')

        this.setState({
            animes: response.data.response,
            animesAux: response.data.response
        })

    }

    loadImgAnime = async (nomeImg) => {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/png');

        await api(`/uploads/${nomeImg}`,
            {
                headers: myHeaders
            }

        )
            .then(resolve => {
                console.log(resolve)
                this.setState({ imgAnime: resolve })
            })
            .catch(error => {
                console.error(error)
            })
    }

    componentDidMount() {
        this.loadAnimesApi()
    }

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
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

    gerirRotas = (rota) => {
        window.location.href = this.pegaUrlAtual() + rota
    }

    baseUrlUploads = (imagem) => {
        return `http://localhost:3000/uploads/${imagem}`
    }

    render() {
        const { animes, animesAux, search } = this.state
        return (

            <div className="main-menu">
                <Header />
                <div>
                    <Button variant="contained"
                        type="submit"
                        color="primary"
                        onClick={() => this.gerirRotas("/incluir-anime")}
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
                        <div className="list-animes" key={anime._key}>
                            <br></br>

                            <img src={this.baseUrlUploads(anime.imgAnime)} type="" width="125px" height="100px" />
                            <h3>{anime.title}</h3>
                            <p>{anime.description}</p>
                            <div className="buttons">
                                <Button
                                    variant="contained"
                                    className="btn-edit"
                                    type="submit"
                                    color="primary"
                                    onClick={() => this.gerirRotas(`/update-animes/${anime.id_anime}`)}> Editar</Button>

                                {/* Gestão dos episodios */}
                                < Button
                                    variant="contained"
                                    className="btn-gerir"
                                    color="primary"
                                    onClick={() => this.gerirRotas('/gerir-episodios')} >Gerir Episodios
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