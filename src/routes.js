import express from 'express'
import userController from './controllers/userController.js'
import authorController from './controllers/authorController.js'
import categoryController from './controllers/categoryController.js'
import editorController from './controllers/editorController.js'
import loginController from './controllers/loginController.js'


const routes = express()

routes.use("/user", userController)
routes.use("/author", authorController)
routes.use("/category", categoryController)
routes.use("/editor", editorController)
routes.use("/login", loginController)

export default routes