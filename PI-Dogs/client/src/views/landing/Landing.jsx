import React from 'react'
import styles from './Landing.Module.css'


export function Landing() {

    return (
        <div className={styles.landing}>
                <h1 className={styles.titleIngreso}>Proyecto Individual del Bootcamp Soy Henry</h1>
                <a href="/home" className={styles.btnIngreso}>Entrar</a>
        </div>
    )
}

