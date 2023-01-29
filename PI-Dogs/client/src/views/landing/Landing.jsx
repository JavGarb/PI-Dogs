import React from 'react'
import styles from './Landing.Module.css'
import { useDispatch } from 'react-redux';
import logo from '../../images/portada.gif'




export function Landing() {
 

    return (
        <div className={styles.landing}>
                <h1 className={styles.titleIngreso}>Razas Caninas</h1>
                <div >
                <img className={styles.foto} src={logo}/>
                </div>
                <a href="/home" className={styles.btnIngreso}></a>
                <p>Trabajo realizado por Javier Garbalena</p>
        </div>
    )
}

