const { Temperament } = require('../db.js');
const { getAll,getApi } = require('../controlers/dogControlers');


//funcion para tomar todos los temperamentos separados
function allTemperaments(arr) {
  let result = []
  try {
    arr.forEach(dogui => {
      if (dogui.Temperaments) {
        result.push(dogui.Temperaments);
      }
    })
    result.concat(result.map(element=> element.split(',')))
    return result.toString().split(',');
  } catch (error) {
    console.log(error);
  }

  //retorno el resultado que es un array con los temperamentos incluye los repetidos
}



//primero traer todos los datos y bajar a la base de datos todos los temperamentos.

async function temperamentsADB() {
  let arr = await getApi();//trae todos los datos de la api
  //me trae una lista con todos los temperamentos enviandole todos los datos
  let temp = allTemperaments(arr);
  //busca si ya existe el temperamento en la base de datos postgres sino lo crea
  temp.forEach(async (element) => {
    const [createdElement, created] = await Temperament.findOrCreate({
      where: { name: element.trim() },
      defaults: { name: element.trim() }
    })
  });
}



const getAllTemp = async () => {
  //ejecuto la funcion que mete todos los temperamentos en la base de datos
  await temperamentsADB();
  //luego traigo de la DB postgres todos los temperamentos 
  const results = await Temperament.findAll({ attributes: ['name', 'id'] });
  //limpio el resultado y lo mando a la ruta para responder
  return (results.map(e => e.dataValues));
}


module.exports = { getAllTemp };