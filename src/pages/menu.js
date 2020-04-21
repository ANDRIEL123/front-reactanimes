import React, { Component } from 'react'
import api from '../services/api'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from './header'
import './menu.css'

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
        search: ''
    }

    loadAnimesApi = async () => {
        const response = await api('/animes')
        this.setState({ animes: response.data.response, animesAux: response.data.response })
        console.log(response.data.response)
    }

    componentDidMount() {
        this.loadAnimesApi()
    }

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    filterAnimes = (animes, query) => {
        var filteredArray = animes.filter(anime => {
            return anime.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
        this.setState({ animesAux: filteredArray })
    };


    render() {
        const { animes, animesAux, search } = this.state
        return (
            <div className="main-menu">
                < Header /><br></br>
                <div>
                    <Button variant="contained" type="submit" color="primary" onClick={""} >Incluir um novo anime</Button>
                </div>
                <div className="search">
                    <TextField label="Pesquise um anime" onKeyDown={(event) => { if (event.keyCode === 13) { this.filterAnimes(animes, search) } }} type="text" onChange={this.handleChangeSearch.bind(this)} />
                    <Button variant="contained" type="submit" color="primary" onClick={() => this.filterAnimes(animes, search)} >Pesquisar anime</Button>
                </div>


                <div className="animes">
                    <h2>Listagem dos Animes</h2>

                    {animesAux.map(anime => (
                        <div className="list-animes" key={anime._key}>
                            <h3>{anime.title}</h3>
                            <p>{anime.description}</p>
                            <div className="buttons">
                                <Button variant="contained" className="btn-edit" type="submit" color="primary" onClick={"#"} >Editar</Button>
                                <Button variant="contained" className="btn-rem" type="submit" color="primary" onClick={"#"} >Remover</Button>
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




            </div>


        )
    }
}