import express, { response } from 'express'
import authorEntity from '../entities/author.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const authorRepository = AppDataSource.getRepository(authorEntity)


route.post("/", async (req,res) => {
    const {name, birthdate, nationality} = req.body
    const newUser = authorRepository.create({name, birthdate, nationality})
    await authorRepository.save(newUser)
    res.send({"responde":`author ${name} cadastrado`})
})

route.get("/", async (req,res) => {
    const {name} = req.params

    let userID = await authorRepository.find()
    res.send(userID)
})

route.get("/:name", async (req,res) => {
    const {name} = req.params

    let userID = await authorRepository.findBy({name: Like(`%${name}%`)})
    res.send(userID)
})

route.put("/", async (req,res) => {
    const {id,name, birthdate, nationality} = req.body

    await authorRepository.update(id, {name, birthdate, nationality})
    res.send(`${nationality} updated`)
})

route.delete("/:idUser", async (req,res) => {
    //soft delete
    const {idUser} = req.params
    const deletedAt = new Date()

    await authorRepository.update(idUser, {deletedAt})
    res.send(`${idUser} Foi deletado em ${deletedAt}`)

})


export default route