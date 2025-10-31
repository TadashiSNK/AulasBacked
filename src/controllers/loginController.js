import express, { response } from 'express'
import userEntity from '../entities/user.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';
import { generateToken } from '../utils/jwt.js';


import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const userRepository = AppDataSource.getRepository(userEntity)
route.post("/", async (req,res) => {
    const {email, senha} = req.body;

    const dadosDoBanco = await userRepository.findOneBy({email: email})

    if (dadosDoBanco.password == senha){
    const token = generateToken({user:dadosDoBanco.name, email:dadosDoBanco.email, typeUser:dadosDoBanco.typeUser})

    return res.status(200).send({"response":"login efetuado com sucesso", token })

    }



    else{
        res.send("Usuario ou senha inválidos")
    }


})


export default route