import express from "express"
import controller from '../controllers/auth.js'

const auth_user = express.Router()

auth_user.post('/register', controller.register)
auth_user.post('/login', controller.login)
auth_user.post('/refresh', controller.login)

export default auth_user