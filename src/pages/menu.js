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
        search: ''
    }

    loadAnimesApi = async () => {
        const response = await api
    }

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value })
        console.log(e.target.value)
    }

    render() {
        return (
            <div className="main-menu">
                < Header /><br></br>
                <div className="search">
                    <TextField label="Pesquise um anime" type="text" onChange={this.handleChangeSearch.bind(this)} />
                    <Button variant="contained" type="submit" color="primary" onClick={"#"} >Incluir anime</Button>
                </div>




            </div>


        )
    }
}