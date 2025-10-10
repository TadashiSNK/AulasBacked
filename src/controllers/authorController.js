import express, { response } from 'express'
import authorEntity from '../entities/author.js'
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import {AppDataSource} from '../database/data-source.js'

const route = express.Router()

const authorRepository = AppDataSource.getRepository(authorEntity)


route.post("/", (req,res) => {
    const {name, age} = req.body





    res.send({"name": `o nome é ${name}`, "age":`a idade é ${age}`})
})


export default route