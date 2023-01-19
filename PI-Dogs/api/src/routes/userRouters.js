const {Router} = require ('express');
const { getUsers, createUser } = require('../controlers/userControlers');


const router= Router();

router.get('/', async(req, res)=>{
    const {mail} = req.body;
    const {dataValues} = await getUsers(mail);
    try {
        res.status(200).send(dataValues);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/', async(req,res)=>{
    const result= await createUser(req.body);
    try {
        res.status(200).send(result);        
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


module.exports= router;