import {GET_PAGE, SET_PAGE} from '../redux/actions'

const initialState= {
    user:{},//guardo el usuario
    favorites:[],//guardo los favoritos del usuario
    page:[],//guardo el array de la pagina actual
    allDogs:[],//guardo todos los dogs
    login:false,//guardo si hay usuario logueado
    actualPage:0,//pagina actual
}

const reducer=(state= initialState , action)=>{
    
    switch(action.type){
        case GET_PAGE:
            return {...state, page:action.payload};
        case SET_PAGE:
            return {...state, actualPage:action.payload};
        default:
            return {...state};
    }

};


export default reducer;