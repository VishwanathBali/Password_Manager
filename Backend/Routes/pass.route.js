import express from "express"
import { pass } from "../Models/pass.model.js"

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const passwords = await pass.find({})

        return res.json(passwords)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }  
})

router.post('/', async (req, res) => {
    try {
        if(
            !req.body.site ||
            !req.body.username ||
            !req.body.password
        ){
            res.status(400).send({message: 'Send all required fields....'})
        }
        const newPass = {
            site: req.body.site,
            username: req.body.username,
            password: req.body.password
        }

        const passData = await pass.create(newPass);
        return res.send(passData)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }  
})

router.delete('/',async (req,res) => {
    try {
        const password = req.body;
        const data = await pass.deleteOne(password)
        if(!data)
        {
            return res.status(400).send({message: 'Password not found'})
        }
        return res.status(200).send("Deleted successfully");
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.put('/:id',async (req,res) => {
    try {
        if(
            !req.body.site ||
            !req.body.username ||
            !req.body.password
        ) {
            return res.status(400).send({message: 'Send all required fields....'})
        }
        const { id } = req.params;
        const result = await pass.findByIdAndUpdate(id,req.body)

        if(!result)
        {
            return res.status(400).send({message: 'Password not found'})
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router