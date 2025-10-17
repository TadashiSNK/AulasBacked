import express, { response } from 'express'
import categoryEntity from "../entities/category.js"
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const categoryRepository = AppDataSource.getRepository(categoryEntity)

route.post("/", async (req,res) => {
    const {id, name} = req.body

    const newCategory = categoryRepository.create({id, name})
    await categoryRepository.save(newCategory)

    res.send(`Categoria ${name} adicionada com sucesso`)

})

route.get("/:name", async (req,res) => {
    const {name} = req.params

    let queryResult = await categoryRepository.findBy({name: Like(`%${name}%`)})
    res.send(queryResult)
})

route.get("/", async (req,res) => {
    const {name} = req.params

    let queryResult = await categoryRepository.find()
    res.send(queryResult)
})

route.put("/", async (req,res) => {
    const {id, name} = req.body

    await categoryRepository.update(id, {name})
    res.send(`Categoria ${name} atualizada`)
})

route.delete("/:id", async (req,res) => {
    const {id} = req.params
    const agora = new Date()

    await categoryRepository.update(id, {deletedAt: agora})
    res.send(`${id} deletado`)
})









export default route;