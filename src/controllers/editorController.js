import express, { response } from 'express'
import editorEntity from '../entities/editor.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const editorRepository = AppDataSource.getRepository(editorEntity)

route.post("/", async (req,res) => {
    const {name, cnpj, email} = req.body

    const newEditor = editorRepository.create({name, cnpj, email})
    await editorRepository.save(newEditor)

    res.send(`Editora Cadastrada`)
})

route.get("/:name", async (req,res) => {
    const {name} = req.params

    let editoraName = await editorRepository.findBy({name: Like(`%${name}%`)})
    res.send(editoraName)
    

})

route.get("/", async (req,res) => {
    const {name} = req.params

    let editoraName = await editorRepository.find()
    res.send(editoraName)
    

})

route.put("/", async (req,res) => {
    const {id, name, cnpj, email} = req.body

    
    await editorRepository.update(id, {name, cnpj, email})
    res.send(`${name} Atualizado`)
})

route.delete("/:idEditora", async (req,res) => {
    const {idEditora} = req.params
    const agora = new Date()

    await editorRepository.update(idEditora, {deletedAt: agora})
    res.send(`${idEditora} Deletado`)
})



export default route;