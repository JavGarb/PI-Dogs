import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosicion } from '../../controladores/controlPaginado.js'
import { getPage, setPage } from '../../redux/actions.js'
import styles from './Paginated.Module.css';

export const Paginated = (props) => {
  let actual = useSelector(state => state.actualPage);
  const max = useSelector(state => state.page.count);
  let position = selectPosicion(max, actual);
  const dispatch = useDispatch();

  useEffect(() => {
    position=selectPosicion(max,actual);
  }, []);

  const onClickHandler = (e) => {
    const value = e.target.innerText;
    if (!isNaN(value)) {
      dispatch(getPage(value));
      dispatch(setPage(value));
    }
    else {
      switch (value) {
        case '<':
          actual--;
          break;
        case '>':
          actual++;
          break;
        case '>>':
          actual=max-1;
          break;
        case '<<':
          actual=1;
          break;
      }
      if(actual >0 && actual < max){
        dispatch(getPage(actual));
        dispatch(setPage(actual));
      }
    }

  };

  console.log(position);
  return (
    <div className={styles.container}>
      <button onClick={onClickHandler}> {'<<'}</button>
      <button onClick={onClickHandler}> {'<'} </button>
      {
        position.map(element => {
          return <button onClick={onClickHandler}>{element}</button>
        })
      }
      <button onClick={onClickHandler}> {'>'} </button>
      <button onClick={onClickHandler}> {'>>'} </button>
    </div>
  )
}

