import express from 'express'
import userController from './controllers/userController.js'
import authorController from './controllers/authorController.js'


const routes = express()

routes.use("/user", userController)
routes.use("/author", authorController)

export default routes