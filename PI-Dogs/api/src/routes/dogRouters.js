const { Router } = require('express');
const { getAll, getName, getId, dogCreate } = require('../controlers/dogControlers');
const {arrayPaginated} = require ('../controlers/paginatedControlers');


const router = Router();
//--------------------------------------------------------terminado
router.get('/', async (req, res) => {
    //ruta que devuelve todos los perros o el que pide el query
    ///dogs?name="...":
    try {
        const { name, page } = req.query;
        let alls = await getAll(); // tomo todos los perros
        const count = Math.ceil(alls.length/8); 
        if (!name && !page) res.status(200).send(alls);// si no hay query envio todos
        else if(!name && page)res.status(200).send({paginated:arrayPaginated(alls, page), count});//si hay page envio la pagina que pide y la cantidad de paginas que hay
        else {//si hay query verifico que tenga al menos 3 letras, si no hay 3 o mas letras enio error
            if(name.length <=2) throw new Error ('Deben ser al menos 3 letras');
            //ahora filtro el perro que se busca por query, paso todo a minisculas
            const one = getName(alls, name);
            //si encuentra algun perro que corresponda lo envio
            if(one.length)res.status(200).send(one);
            //sino mando un error
            else throw new Error('No existe el perro')
        }
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});
//----------------------------------------------------------terminado
router.get('/:id',async (req, res) => {
    //ruta que devuelve los datos del perro requerido
    const { id } = req.params;
    const alls = await getAll(); // tomo todos los perros
    const forId = getId(alls, id)
    try {
        if(forId)res.status(200).send(forId);
        else throw new Error('Ningun perro con ese id')
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const obj = req.body;
    const dogCreated= await dogCreate(obj);
    try {
        res.status(200).send(dogCreated);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})



module.exports = router;

/*
[ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
[ ] POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos
*/