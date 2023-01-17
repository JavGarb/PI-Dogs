const {Router} = require ('express');


const router= Router();

router.get('/', (req, res)=>{
    const {usuario} = req.body;
    try {
        res.status(200).send(`estoy en user con ${usuario}`);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});


module.exports= router;