const { Temperament } = require('../db.js');
const { getAll } = require('../controlers/dogControlers');


//funcion para tomar todos los 
function allTemperaments(arr) {
  let temporary = [];
  let results=[];// la usare para entregar los resultados
  //recorro todo el array para sacar los temperamentos
  arr.forEach((element) =>{
    let{temperament}= element;//desestructuro el temperamento
    //tengo que verificar que el temperamento contenga algo
    if(temperament){
      //temperamento es un string separado por comas, por tanto
      //hago un split que me devuelve un array con las palabras
      temporary= temperament.split(',');
      //recorro el array y vou pusheando al resultado
      temporary.map(elem=>{
        results.push(elem.trim())
      })
    }
  });
  //retorno el resultado que es un array con los temperamentos incluye los repetidos
  return results;
}



//primero traer todos los datos y bajar a la base de datos todos los temperamentos.

async function temperamentsADB() {
  let arr = await getAll();//trae todos los datos de la api
  //me trae una lista con todos los temperamentos enviandole todos los datos
  let temp = allTemperaments(arr);
  //busca si ya existe el temperamento en la base de datos postgres sino lo crea
  temp.forEach(async (element) => {
    const [createdElement, created] = await Temperament.findOrCreate({
      where: { name:element },
      defaults: { name:element }
    })});
}



const getAllTemp = async () => {
  //ejecuto la funcion que mete todos los temperamentos en la base de datos
  await temperamentsADB();
  //luego traigo de la DB postgres todos los temperamentos 
  const results= await Temperament.findAll({attributes:['name']});
  //limpio el resultado y lo mando a la ruta para responder
  return (results.map(e=> e.dataValues.name));
}


module.exports = { getAllTemp };