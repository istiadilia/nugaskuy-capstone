import express from "express"
import controller from '../controllers/mata_pelajaran.js'

const mata_pelajaran = express.Router()

mata_pelajaran.post('/', controller.create_mata_pelajaran)
mata_pelajaran.get('/', controller.get_mata_pelajaran)
mata_pelajaran.delete('/:id_mata_pelajaran', controller.delete_mata_pelajaran)
mata_pelajaran.put('/:id_mata_pelajaran', controller.update_mata_pelajaran)


export default mata_pelajaran