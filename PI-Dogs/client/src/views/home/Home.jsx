import React from 'react';
import {Cards} from '../../components/cards/Cards';
import {NavBar} from '../../components/navBar/NavBar';
import {Footer} from '../../components/footer/Footer';
import {Title} from '../../components/title/Title';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPage, setPage, getAll, getTemperaments } from '../../redux/actions';
import styles  from './Home.Module.css';
import { Paginated } from '../../components/paginated/Paginated';
import { SearchBar } from '../../components/searchBar/SearchBar';

export const Home = (props) => {
  
  const dispatch = useDispatch();
  
    dispatch(getPage(1,"Ascendente", "Raza"));
    dispatch(getAll());
    dispatch(setPage(1));
    dispatch(getTemperaments());
 useEffect(()=>{
       dispatch(getPage(1,"Ascendente", "Raza"));
      dispatch(getAll());
      dispatch(setPage(1));
      dispatch(getTemperaments());
  },[])

  return (
    <div className={styles.containerHome}>
      <NavBar />
      <Title />
      <SearchBar />
      <Paginated />
      <Cards />
      <Paginated />
      <Footer />
    </div>
  )
}

