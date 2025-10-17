import express from 'express'
import userController from './controllers/userController.js'
import authorController from './controllers/authorController.js'
import categoryController from './controllers/categoryController.js'
import editorController from './controllers/editorController.js'


const routes = express()

routes.use("/user", userController)
routes.use("/author", authorController)
routes.use("/category", categoryController)
routes.use("/editor", editorController)

export default routes