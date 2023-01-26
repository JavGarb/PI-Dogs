import {useSelected} from 'react-redux';

function temperamentFilter(temperament){
    const allDogs = useSelected(state=> state.allDogs);
    const page= useSelected(state=> state.actualPage);
    
}