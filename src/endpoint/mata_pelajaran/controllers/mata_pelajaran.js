import { uid } from 'uid';
import conn from '../../../config/index.js'

const create_mata_pelajaran = async (req, res) => {
    const id_mata_pelajaran = uid(16)
    const { nama } = req.body

    const query = 'INSERT INTO tb_mata_pelajaran (id_mata_pelajaran, nama_mata_pelajaran, aset) VALUES (?,?,?)'

    const payload = [id_mata_pelajaran, nama, 'not defined']

    const handle_create_mata_pelajaran = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Create New Mata Pelajaran',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, payload, handle_create_mata_pelajaran)
}

const get_mata_pelajaran = async (req, res) => {
    const query = 'SELECT * FROM tb_mata_pelajaran'

    const handle_get_mata_pelajaran = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Get Mata Pelajaran List',
                data: result
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, {}, handle_get_mata_pelajaran)
}

const delete_mata_pelajaran = async (req, res) => {
    const { id_mata_pelajaran } = req.params
    const query = `DELETE FROM tb_mata_pelajaran WHERE id_mata_pelajaran = ?`

    const handle_delete_mata_pelajaran = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Delete Mata Pelajaran',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, [id_mata_pelajaran], handle_delete_mata_pelajaran)
}

const update_mata_pelajaran = async (req, res) => {
    const { nama } = req.body
    const { id_mata_pelajaran } = req.params

    const query = `UPDATE tb_mata_pelajaran SET nama_mata_pelajaran = ? WHERE id_mata_pelajaran = ?`

    const payload = [nama, id_mata_pelajaran]

    const handle_update_mata_pelajaran = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Update Mata Pelajaran',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, payload, handle_update_mata_pelajaran)
}

const controller = {
    create_mata_pelajaran,
    get_mata_pelajaran,
    delete_mata_pelajaran,
    update_mata_pelajaran
}

export default controller