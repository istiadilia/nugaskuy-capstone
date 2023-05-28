import express from "express"
import controller from '../controllers/auth.js'
import { is_login } from '../../../middeware/access_auth.js'

const auth_mentor = express.Router()

auth_mentor.post('/register', controller.register)
auth_mentor.post('/login', controller.login)

auth_mentor.get('/refresh', is_login, controller.refresh_token)

export default auth_mentor