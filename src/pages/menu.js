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
        numRegisters: 0,
        search: '',
        title: '',
        description: '',
        key: '',
        page: 1,
        limitPage: 1
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    loadAnimesApi = async (page = 1) => {
        const { numRegisters } = this.state

        //FAÇO UMA REQUISIÇÃO PARA A ROTA /animes e passo o parametro Page
        //para informar ao back em que page está, no back ficaria:
        //req.query.page
        const response = await api('/animes', {
            params: {
                page: page
            }
        })

        //Pego o objeto retornado do MYSQL informando o número de registros
        //Utilizando o SQL_CALC_FOUND_ROWS e após SELECT FOUND_ROWS() para descobrir
        //A quantidade de registros, avalie o back
        let numRegistros = Object.values(response.data.numRegisters)

        //Se o numero de registros da tabela animes for maior que 10, então
        //A aplicação possuí mais de uma página, dessa forma divido por 10
        //que é o limite de registros por página e aplico a regra conforme
        //função ajustaPageRegisters()
        if (numRegistros[0] > 10) {
            this.setState({ limitPage: this.ajustaPageRegisters(numRegisters / 10) })
        } else {
            this.setState({ limitPage: 1 })
        }

        this.setState({
            animes: response.data.response,
            numRegisters: numRegistros[0]
        })
    }

    ajustaPageRegisters = (number) => {
        if ((number - parseInt(number)) === 0) {
            return parseInt(number)
        } else {
            return parseInt(number) + 1
        }
    }

    previousPage = () => {
        let { page } = this.state
        const pageAux = page

        if (this.state.page > 1) {
            this.setState({ page: page - 1 })
            const pageNumber = pageAux - 1
            this.loadAnimesApi(pageNumber)
        }
    }

    nextPage = () => {
        let { page, numRegisters, limitPage } = this.state
        const pageAux = page

        this.setState({ page: page + 1 })
        const pageNumber = pageAux + 1

        this.loadAnimesApi(pageNumber)
    }

    componentDidMount() {
        this.loadAnimesApi(this.state.page)
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
        const { search } = this.state
        //SÓ CONSULTO SE FOR PELOMENOS 2 LETRAS NO FILTRO
        if (search.length > 1) {
            const response = await api.get('/animes/filter/animes', {
                //Envio ao back o parametro (query)
                //titleAnime abaixo, no back ficando req.query.titleAnime
                params: {
                    titleAnime: search
                }
            })
            this.setState({ animes: response.data.response, page: 1, limitPage: 1 })
            console.log(response.data.response)
        } else {
            alert('Digite pelo menos 2 letras na pesquisa.')
        }
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
        const { animes, page, limitPage } = this.state
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
                                <Link to={`/update-animes/${anime.idanimes}`}>
                                    <Button
                                        variant="contained"
                                        className="btn-edit"
                                        type="submit"
                                        color="primary"
                                    > Editar</Button>
                                </Link>
                                {/* Gestão dos episodios */}
                                <Link to={`/gerir-episodios/${anime.idanimes}`}>
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
                    <div className="pages-animes">
                        <Button variant="contained" disabled={page === 1} className="btn-ant" type="submit" color="primary" onClick={() => this.previousPage()} >Página anterior</Button>
                        <h3>Página {page}</h3>
                        <Button variant="contained" disabled={page === limitPage} className="btn-prox" type="submit" color="primary" onClick={() => this.nextPage()} >Próxima Página</Button>
                    </div>
                    <div>
                        <h3> by Andriel Friedrich © </h3>
                    </div>

                </div>
            </div >


        )
    }
}