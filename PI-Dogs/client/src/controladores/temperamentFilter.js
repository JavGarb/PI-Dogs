
// esta funcion filtra por temperamento a nivel local y luego envia la pagina actual al store
function temperamentFilter(arr, temperament){
    
    let filtered=[];
    for(let i=0; i<arr.length;i++){
        if(arr[i].Temperaments?.includes(temperament))filtered.push(arr[i])
    }
    return filtered;

    
}

export default temperamentFilter;