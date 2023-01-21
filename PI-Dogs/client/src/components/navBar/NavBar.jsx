import React from 'react'
import styles from './NavBar.Module.css'
import { useSelector } from 'react-redux'



export const NavBar = (props) => {
  const login= useSelector(state=> state.login);
  console.log(login);
  return (
    <div className={styles.container} >
      <a href="/home">Home</a>
      <a href="/newuser">New User</a>
      <a href="/newDog">New Dog</a>
      {login && <a href="/userFavorites">Favorites</a>}
      {!login?<a href="/Login">Login</a>:<a href="/landing">Logout</a>}
      <p>Usuario Anonimo</p>
    </div>
  )
}

