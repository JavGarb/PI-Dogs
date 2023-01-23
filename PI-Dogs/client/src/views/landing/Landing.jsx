import React from 'react'
import styles from './Landing.Module.css'
const rutaImagen = 'https://i.gifer.com/origin/8a/8ae7d9dcf1faad6107c974edff70a23e_w200.gif';


export function Landing() {

    return (
        <div className={styles.landing}>
                <h1 className={styles.titleIngreso}>Proyecto Individual del Bootcamp Soy Henry</h1>
                <a href="/home" className={styles.btnIngreso}>Entrar</a>
        </div>
    )
}

