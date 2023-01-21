import React from 'react'
import {getDogs} from '../../redux/actions.js'

export function Landing() {

    const presion= ()=>{
        console.log('presione entrar');
    }
    return (
        <div>
            <h1>Landing</h1>
            <p><a href="/home" onClick = {presion}>Ingresar</a></p>
        </div>
    )
}

