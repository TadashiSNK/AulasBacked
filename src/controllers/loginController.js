import express, { response } from 'express'
import userEntity from '../entities/user.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const userRepository = AppDataSource.getRepository(userEntity)
route.post("/", async (req,res) => {
    const {email, senha} = req.body;

    const checkEmail = await userRepository.findOneBy({email: email})

    if (checkEmail.password == senha){
        res.send(`
  <h1 style="
    color: red;
    border: 1px solid black;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: yellow;
    justify-content: center;
    align-items: center;
  ">
    LOGADO
  </h1>
`);
    }

    else{
        res.send("Usuario ou senha inválidos")
    }


})


export default route