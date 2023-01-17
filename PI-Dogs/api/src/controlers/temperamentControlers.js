const { Temperamento } = require('../db.js');
const { getAll } = require('../controlers/dogControlers');


//funcion para tomar todos los 
function allTemperamentos(arr) {
  let temporal = [];
  let resultado=[];
  arr.forEach((elemento) =>{
    let{temperamento}= elemento;
    if(temperamento){
      temporal= temperamento.split(',');
      temporal.map(elem=>{
        resultado.push(elem.trim())
      })
    }
  });
  return resultado;
}



//primero traer todos los datos y bajar a la base de datos todos los temperamentos.

async function temperamentosADB() {
  let arr = await getAll();//trae todos los datos de la api
  //me trae una lista con todos los temperamentos enviandole todos los datos
  let temp = allTemperamentos(arr);
  //busca si ya existe el temperamento sino lo crea
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