const {Router} = require ('express');


const router= Router();
//--------------------------------------------------------
router.get('/', (req, res)=>{
    //ruta que devuelve todos los perros o el que pide el query
    ///dogs?name="...":
    try {
        const {name}= req.query;
        if(!name)res.status(200).send('devuelvo todos los perros');
        else res.status(200).send (`envio el perro ${name}`); 
    } catch (error) {
        console.log(error.message)//gestionar errores
    }
});
//----------------------------------------------------------
// router.get('/', (req, res)=>{
//     //ruta que devuelve todos los perros, solo datos requeridos
//     try {
//         res.status(200).send('devuelvo todos los perros'); 
//     } catch (error) {
//         console.log(error.message)//gestionar errores
//     }
// });

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
[ ] GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/