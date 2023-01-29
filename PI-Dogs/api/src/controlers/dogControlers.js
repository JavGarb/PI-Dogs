const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { TOKEN_API } = process.env;


//traemos los datos de la api
const getApi = async () => {
    const getApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=' + TOKEN_API);
    const response = await getApi.data.map(element => {
        //solo devuelvo lo que voy a usar
        return {
            id: element.id,
            name: element.name,
            height: element.height.metric,
            weight: element.weight.metric,
            year_life: element.life_span,
            Temperaments: element.temperament,
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
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const dbToStr=(dataB)=>{
    let str='';
    dataB.forEach(element => {
        for(i=0; i<element.dataValues.Temperaments.length;i++){
            str? str= str + ', '  + element.dataValues.Temperaments[i].name:str=element.dataValues.Temperaments[i].name ;
        }
        element.dataValues.Temperaments=str; 
    });
}
//esta funcion ejecuta las funciones que traen los datos de la base de datos y
// de la api, luego concatena los resultados y los retorna para usarlas en la ruta
const getAll = async (order, value) => {
    try {
        const res = await getApi();
        let dataBase = await getDB();
        dbToStr(dataBase);//el array de objetos que viene de la base de datos la retorno como un string
        let arr = [...dataBase, ...res];//await res.concat(dataBase);//return await res.concat(dataBase);*esta linea comente para agregar orden
        //lineas agregadas para hacer los ordenamientos por raza o peso************************************************
        if (order === 'Descendente' && value === 'Raza') arr = arr.sort((a, b) => b.name.localeCompare(a.name, 'en', { sensitivity: 'base' }));
        if (order === 'Ascendente' && value === 'Raza') arr = arr.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
        if (order === 'Ascendente' && value === 'Peso') {
            arr = arr.sort((a, b) => parseInt(a.weight.substr(0, 2) - parseInt(b.weight.substr(0, 2))))
        }
        if (order === 'Descendente' && value === 'Peso') {
            arr = arr.sort((a, b) => parseInt(a.weight.substr(0, 2) + parseInt(b.weight.substr(0, 2))))
        }
        return arr;
    }
    //******************************************************************************************************** */
    catch (error) {
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
    const [res] = alls.filter(element => element.id == id);
    return res;
}

const dogCreate = async (obj) => {
    try {
        const { name, height, weight, year_life, temperament, image } = obj;
        const dogCreated = await Dog.create({
            name: name,
            height: height,
            weight: weight,
            year_life: year_life,
            image: image,
        });
        await dogCreated.addTemperament(temperament)
        // let nameTemp = name.trim()//.toLowerCase();
        // const [dogCreate, create] = await Dog.findOrCreate({ where: { name: nameTemp }, defaults: { height, weight, year_life, temperament, image } });
        // const temp = await Temperament.create({ name: temperament })
        // create.temperament = temp.name;
        // if (create) return dogCreate;
        // else throw new Error('No se pudo crear el perro, intentelo mas tarde')
    } catch (error) {
        return error.message;
    }
}


module.exports = { getAll, getName, getId, dogCreate, getApi }

