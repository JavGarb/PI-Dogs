const {Router} = require ('express');
const { Temperamento } = require('../db.js');
const {getAllTemp} = require ('../controlers/temperamentControlers')


const router= Router();


router.get('/', async (req, res)=>{
    //devuelvo todos los temperamentos
    try {
        res.status(200).send(await getAllTemp());
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});



module.exports=router;

/*
[ ] GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

*/