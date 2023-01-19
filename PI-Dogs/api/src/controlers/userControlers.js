const { User, Dog } = require('../db.js');

//esta funcion devuelve un usuario de acuerdo al mail
const getUsers = async (mail) => {
    //retorna el usuario pedido
    return await User.findOne({
        where: { mail: mail },
        include:[{
            model:Dog
        }]
    });
}

async function createUser(obj) {
    const { first_name, last_name, mail, password } = obj;
    if (first_name && last_name && mail && password) {
        const [userCreate, create] = await User.findOrCreate({
            where: { mail: mail },
            defaults: { first_name, last_name, password }
        });
        if (create) return userCreate;
        else throw new Error('No se pudo crear la cuenta, intentelo mas tarde');
    }

}

module.exports = { getUsers, createUser }