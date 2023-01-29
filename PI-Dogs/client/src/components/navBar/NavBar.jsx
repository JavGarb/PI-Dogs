import React from 'react'
import styles from './NavBar.Module.css'
import { useSelector } from 'react-redux'



export const NavBar = (props) => {
  const login= useSelector(state=> state.login);
  return (
    <div className={styles.containerNav} >
      <a className={styles.btn} href="/home">Home</a>
      {/* <a className={styles.btn} href="/newuser">New User</a> */}
      <a className={styles.btn} href="/newDog">New Dog</a>
      {/* {login && <a className={styles.btn} href="/userFavorites">Favorites</a>} */}
      {/* {!login?<a className={styles.btn} href="/Login">Login</a>:<a href="/landing">Logout</a>} */}
    </div>
  )
}

