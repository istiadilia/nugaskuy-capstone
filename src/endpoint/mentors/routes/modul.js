import express from "express"
import controller from '../controllers/modul.js'

const modul_mentor = express.Router()

modul_mentor.post('/:id_mentor/:id_modul', controller.create_modul_mentor)
modul_mentor.get('/:id_mentor/:id_modul', controller.get_modul_mentor)
modul_mentor.delete('/:id_modul_mentor', controller.delete_modul_mentor)
modul_mentor.put('/:id_modul_mentor', controller.update_modul_mentor)


export default modul_mentor