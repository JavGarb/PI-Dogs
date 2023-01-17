const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouters = require ('./dogRouters')
const dogTemperaments = require ('./temperamentsRouters');
const userRouters = require ('./userRouters');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouters);
router.use('/temperaments', dogTemperaments);
router.use('/user', userRouters);

module.exports = router;
