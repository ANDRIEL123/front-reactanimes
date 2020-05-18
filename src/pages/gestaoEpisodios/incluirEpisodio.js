import React, { useState } from 'react'
import Header from '../header'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function IncluirEpisodio() {
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [key, setKey] = useState('')

    const changeHandler = (e) => {
        e.target.name(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>
            <Header />
            <h2>Inclusão de episódio</h2>

            <form>
                <TextField
                    label="Título do Anime"
                    type="text"
                    name="setTitle"
                    value={title}
                    onChange={changeHandler}
                    required />
                <br></br><br></br>
                <TextField
                    label="Description do Anime"
                    type="text"
                    multiline
                    rows="4"
                    variant="outlined"
                    name="setDescription"
                    value={description}
                    onChange={changeHandler}
                    required />
                <br></br><br></br>
                <TextField
                    label="Key do Anime"
                    type="text"
                    name="setKey"
                    value={key}
                    onChange={changeHandler}
                    required />
            </form>
        </div>
    )
}

export default IncluirEpisodio
