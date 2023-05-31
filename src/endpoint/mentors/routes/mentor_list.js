import express from "express"
import controller from '../controllers/mentor_list.js'
import { is_login } from '../../../middeware/access_auth.js'

const available_mentor = express.Router()

available_mentor.get('/:id_modul', is_login, controller.get_available_mentor)

export default available_mentor