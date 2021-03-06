import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import logo from '../../logo.svg';
import './login.css'
import api from '../../services/api'

export default class Login extends Component {
    state = {
        user: '',
        password: '',
        users: []
    }

    //Controle de mudança do usuario
    handleChangeUser = (e) => {
        this.setState({
            user: e.target.value
        })
    }
    //Controle de mudança senha
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    loadApi = async () => {
        const response = await api.get('/usuarios');
        this.setState({ users: response.data.response })
        console.log(this.state.users)
        this.validacaoUsuario()
    }

    pegaUrlAtual = () => {
        const url = window.location.href.split(window.location.pathname)
        return url[0]
    }

    gerirRotas = (rota) => {
        window.location.href = this.pegaUrlAtual() + rota
    }


    validacaoUsuario = () => {
        let valida = false
        const { user, password, users } = this.state;
        users.map(value => {
            if (user === value.user && password === value.password) {
                sessionStorage.setItem('user', value.user)
                sessionStorage.setItem('password', value.password)
                this.gerirRotas('/dashboard')
                valida = true
            }
        })
        if (valida === false) {
            alert('Usuário não existente ou dados inválidos!')
        }
    }


    render() {
        return (
            <div className="login">
                <div>
                    <h2>CRUD React Animes</h2>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div>
                    <TextField className="login" label="Login" onKeyDown={(event) => { if (event.keyCode === 13) { this.loadApi() } }} onChange={this.handleChangeUser.bind(this)} required /><br></br><br></br>
                    <TextField className="senha" label="Senha" type="password" onKeyDown={(event) => { if (event.keyCode === 13) { this.loadApi() } }} onChange={this.handleChangePassword.bind(this)} required /><br></br><br></br><br></br>
                    <Button variant="contained" type="submit" color="primary" onKeyDown={(event) => { if (event.keyCode === 13) { this.loadApi() } }} onClick={() => this.loadApi()} >Ok</Button>
                </div>
            </div>
        )
    }

}