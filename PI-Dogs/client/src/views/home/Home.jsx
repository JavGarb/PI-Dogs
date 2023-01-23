import React from 'react';
import { connect } from 'react-redux';
import {Cards} from '../../components/cards/Cards';
import {NavBar} from '../../components/navBar/NavBar';
import {Footer} from '../../components/footer/Footer';
import {Title} from '../../components/title/Title';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPage, setPage, getAll } from '../../redux/actions';
import styles  from './Home.Module.css';
import { Paginated } from '../../components/paginated/Paginated';
import { SearchBar } from '../../components/searchBar/SearchBar';

export const Home = (props) => {
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getPage(1));
    dispatch(setPage(1));
    dispatch(getAll());
  },[]);

  return (
    <div className={styles.containerHome}>
      <NavBar />
      <Title />
      <SearchBar />
      <Cards />
      <Paginated />
      <Footer />
    </div>
  )
}

