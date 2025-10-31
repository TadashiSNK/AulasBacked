import express, { response } from 'express'
import userEntity from '../entities/user.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'


const route = express.Router()

const userRepository = AppDataSource.getRepository(userEntity)


route.post("/", async (request, response) => {
    const { name, email, password, typeUser } = request.body;

    if(name.length  < 2){
        return response.send("O nome precisa ter mais de 2 caracteres")
    }

    if(!email.includes("@")){
        return response.send("O email precisa ter '@'")
    }

    if(!(password.length >= 6 && password.length <= 10)){
        return response.send("A senha precisa ter no minimo 6 caracters e no maximo 10")
    }

    if (typeUser != "admin" && typeUser != "comum"){
        return response.send("o tipo de usuario só pode ser 'admin' ou 'comum'")
    }

    const newUser = userRepository.create({name, email, password, typeUser, createdAt:"10-10-2025"})
    await userRepository.save(newUser)


    response.send(`Usuario ${name} cadastrado`)
})


// route.get("/", async (req,res) => {
//     const users = await userRepository.find()
//     return res.send({"response": users})
// })


route.get("/:name", async (req,res) => {
    try{
        let {name} = req.params
        let userID = await userRepository.findBy({name: Like(`%${name}%`)})
        return res.send(userID)

    } catch(err){
        return res.send(`Houve um erro ${err}`)
    }
})


route.put("/", async (req,res) => {
    const {id, name, email, password, typeUser} = req.body

    await userRepository.update(id, {name, email, password, typeUser})

    return res.send({"response": "Dados atualizados"})
})

route.delete("/:idUser", async (req,res) => {
    const {idUser} = req.params

    await userRepository.delete({id: idUser})
    res.send({"response": `${idUser} deletado`})
})

export default route;