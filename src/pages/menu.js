import React, { Component } from 'react'
import api from '../services/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Update from './updateAnime'
import Header from './header'
import { Link } from 'react-router-dom'
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
        page: 1
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    loadAnimesApi = async (page = 1) => {
        const response = await api('/animes')

        this.setState({
            animes: response.data.response
        })
        console.log(response.data.response)
    }
    /*
        previousPage = () => {
            let { page } = this.state
            if (this.state.page > 0) {
                this.setState({ page: page - 1 })
            }
        }
    
        nextPage = () => {
            let { page } = this.state
            this.setState({ page: page + 1 })
        }
    */
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

    /* 
    filterAnimes = (animes, query) => {
        var filteredArray = animes.filter(anime => {
            return anime.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        this.setState({ animesAux: filteredArray })
    };
    */

    loadFilterAnimes = async () => {
        const response = await api.get('/animes/filter/animes', {
            //Envio ao back o parametro titleAnime abaixo, no back ficando req.query.titleAnime
            params: {
                titleAnime: this.state.search
            }
        })
        this.setState({ animes: response.data.response })
        console.log(response.data.response)
    }

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
        return `${process.env.REACT_APP_API_URL}/uploads/${imagem}`
    }

    render() {
        const { animes, animesAux, search, page } = this.state
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
                        onKeyDown={(event) => { if (event.keyCode === 13) { this.loadFilterAnimes() } }}
                        type="text"
                        onChange={this.handleChangeSearch.bind(this)} />
                    <Button variant="contained" type="submit" color="primary" onClick={() => this.loadFilterAnimes()} >Pesquisar anime</Button>
                </div>


                <div className="animes">
                    <h2>Listagem dos Animes</h2>

                    {animes.map((anime, index) => (

                        < div className="list-animes" key={anime._key} >
                            <br></br>
                            {console.log(anime)}
                            <img src={this.baseUrlUploads(anime.imgAnime)} width="125px" height="100px" />
                            <h3>{anime.titleAnime}</h3>
                            <p>{anime.descriptionAnime}</p>
                            <div className="buttons">
                                <Link to={`/update-animes/${anime.id_anime}`}>
                                    <Button
                                        variant="contained"
                                        className="btn-edit"
                                        type="submit"
                                        color="primary"
                                    > Editar</Button>
                                </Link>
                                {/* Gestão dos episodios */}
                                <Link to={`/gerir-episodios/${anime.id_anime}`}>
                                    < Button
                                        variant="contained"
                                        className="btn-gerir"
                                        color="primary"
                                    >Gerir Episodios
                                </Button>
                                </Link>

                                <Button variant="contained" className="btn-rem" color="primary" onClick={() => {
                                    let confirma = window.confirm("Você deseja realmente remover esse anime e todos os seus episódios?")
                                    if (confirma) {
                                        this.removerAnime(anime, index)
                                    }
                                }} >Remover</Button>


                            </div>
                        </div>

                    ))}
                    <div>
                        <h3> by Andriel Friedrich © </h3>
                    </div>

                </div>
            </div >


        )
    }
}