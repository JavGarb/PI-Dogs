const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { TOKEN_API } = process.env;


//traemos los datos de la api
const getApi = async () => {
    const getApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key='+TOKEN_API);
    const response = await getApi.data.map(element => {
        //solo devuelvo lo que voy a usar
        return {
            id: element.id,
            name: element.name,
            height: element.height.metric,
            weight: element.weight.metric,
            year_life: element.life_span,
            temperament: element.temperament,
            image: element.image
        }
    });
    return response;
}
//TOMAMOS TODOS LOS DATOS DE LOS PERROS DE LA BASE DE DATOS
const getDB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
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

const getName = (alls, name) => {
    const res = alls.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));
    return res;
}
const getId = (alls, id) => {
    const res = alls.filter(element => element.id == id);
    return res;
}

const dogCreate = async (obj) => {
    const {name, height, weight, year_life, temperament} = obj;
    const create= await Dog.create({name, height, weight, year_life});
    const temp = await Temperament.create({name: temperament})
    create.temperament= temp.name;
    return create;
}


module.exports = { getAll, getName, getId, dogCreate }

