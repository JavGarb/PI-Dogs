import React from 'react'
import { useSelector } from 'react-redux'
import { NavBar } from '../../components/navBar/NavBar'

export const NewUser = (props) => {
  const temps= useSelector(state=> state.temperaments)
  return (
    <div>
      <NavBar />
      {temps?temps:'no hay nada'}</div>
  )
}

