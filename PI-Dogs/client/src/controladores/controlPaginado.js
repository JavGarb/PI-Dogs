//si esta en una pagina menor a 3 deberia mostrar 5 primeros numeros
//si esta en 3 o mayor deberia mostrar en el centro la pagina actual
//las dos anteriores en los botones anteriores y las dos siguientes
//en los botones siguientes.
//si esta al final menos 2 posiciones de todas las paginas deberia 
//mostrar solo los ultimos 5 numeros de pagina. 


export function selectPosicion(max, actual){
    if(max >= 5 && actual < 3 )return [1,2,3,4,5]; //esta a menos de 5
    else if(actual >= max -2)return [max-4, max-3, max-2, max -1, max];//esta a en el limite
    else {
        let num= parseInt(actual)
        return [num-2, num-1, num, num+1,num +2];
    }
};