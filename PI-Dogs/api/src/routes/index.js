const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouters = require ('./dogRouters')


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouters)

module.exports = router;
