const { Temperamento } = require('../db.js');
const { getAll } = require('../controlers/dogControlers');


//funcion para tomar todos los 
function allTemperamentos(arr) {
  let temporal = [];
  let resultado=[];// la usare para entregar los resultados
  //recorro todo el array para sacar los temperamentos
  arr.forEach((elemento) =>{
    let{temperamento}= elemento;//desestructuro el temperamento
    //tengo que verificar que el temperamento contenga algo
    if(temperamento){
      //temperamento es un string separado por comas, por tanto
      //hago un split que me devuelve un array con las palabras
      temporal= temperamento.split(',');
      //recorro el array y vou pusheando al resultado
      temporal.map(elem=>{
        resultado.push(elem.trim())
      })
    }
  });
  //retorno el resultado que es un array con los temperamentos incluye los repetidos
  return resultado;
}



//primero traer todos los datos y bajar a la base de datos todos los temperamentos.

async function temperamentosADB() {
  let arr = await getAll();//trae todos los datos de la api
  //me trae una lista con todos los temperamentos enviandole todos los datos
  let temp = allTemperamentos(arr);
  //busca si ya existe el temperamento en la base de datos postgres sino lo crea
  temp.forEach(async (element) => {
    const [createdElement, created] = await Temperamento.findOrCreate({
      where: { name:element },
      defaults: { name:element }
    })});
}



const getAllTemp = async () => {
  temperamentosADB();
  const resultado= await Temperamento.findAll({attributes:['name']});
  return(resultado.map(e=> e.dataValues.name));
}


module.exports = { getAllTemp };