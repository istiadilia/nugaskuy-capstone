import express from "express"
import controller from '../controllers/modul.js'

const modul = express.Router()

modul.post('/:id_mata_pelajaran', controller.create_modul)
modul.get('/:id_mata_pelajaran', controller.get_modul)
modul.delete('/:id_modul', controller.delete_modul)
modul.put('/:id_modul', controller.update_modul)


export default modul