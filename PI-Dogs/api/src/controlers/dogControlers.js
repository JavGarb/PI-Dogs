const axios = require('axios');
const { Dog, Temperamento } = require('../db.js');
const { TOKEN_API } = process.env;


//traemos los datos de la api
const getApi = async () => {
    const getApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key='+TOKEN_API);
    const respuesta = await getApi.data.map(element => {
        //solo devuelvo lo que voy a usar
        return {
            id: element.id,
            name: element.name,
            altura: element.height.metric,
            peso: element.weight.metric,
            anos_vida: element.life_span,
            temperamento: element.temperament,
            imagen: element.image
        }
    });
    return respuesta;
}
//TOMAMOS TODOS LOS DATOS DE LOS PERROS DE LA BASE DE DATOS
const getDB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}
//esta funcion ejecuta las funciones que traen los datos de la base de datos y
// de la api, luego concatena los resultados y los retorna para usarlas en la ruta
const getAll = async () => {
try {
    const res = await getApi();
    const dataBase = await getDB();
    return await res.concat(dataBase);
} catch (error) {
    console.log(error);
}
}
//La realizamos con metodos then y catch :)
// const getAll = () => {
//     //devuelve una promesa que se resuelve con la concatenacion de getApi y getDB
//     return getApi()
//         .then(res => {
//             console.log('then del getApi')
//             return getDB().then(dataBase => {
//                 console.log('then del dataBase')
//                 return res.concat(dataBase);
//             });
//         });
// };

const getName = (todos, name) => {
    const res = todos.filter(elemento => elemento.name.toLowerCase().includes(name.toLowerCase()));
    return res;
}
const getId = (todos, id) => {
    const res = todos.filter(elemento => elemento.id == id);
    return res;
}

const dogCreate = async (obj) => {
    const {name, altura, peso, anos_vida, temperamento} = obj;
    const creado= await Dog.create({name, altura, peso, anos_vida});
    const temp = await Temperamento.create({name: temperamento})
    creado.temperamento= temp.name;
    return creado;
}


module.exports = { getAll, getName, getId, dogCreate }

