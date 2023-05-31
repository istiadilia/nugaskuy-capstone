import express from "express"
import controller from '../controllers/jadwal.js'
import { mentor, is_login } from '../../../middeware/access_auth.js'

const jadwal = express.Router()

jadwal.post('/:id_mentor', mentor, controller.create_jadwal)
jadwal.get('/:id_mentor', is_login, controller.get_jadwal)
jadwal.delete('/:id_jadwal', mentor, controller.delete_jadwal)
jadwal.put('/:id_jadwal', mentor, controller.edit_jadwal)


export default jadwal