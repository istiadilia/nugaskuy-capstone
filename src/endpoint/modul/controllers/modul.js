import { uid } from 'uid';
import conn from '../../../config/index.js'

const create_modul = async (req, res) => {
    const id_modul = uid(16)
    const { id_mata_pelajaran } = req.params
    const { nama } = req.body

    const query = 'INSERT INTO tb_modul (id_modul, nama_modul, id_mata_pelajaran, aset) VALUES (?,?,?,?)'

    const payload = [id_modul, nama, id_mata_pelajaran, 'not defined']

    const handle_create_modul = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Create New Modul',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, payload, handle_create_modul)
}

const get_modul = async (req, res) => {
    const { id_mata_pelajaran } = req.params

    const query = 'SELECT * FROM tb_modul WHERE id_mata_pelajaran = ?'

    const handle_get_modul = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Get Modul List',
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

    await conn.query(query, [id_mata_pelajaran], handle_get_modul)
}

const delete_modul = async (req, res) => {
    const { id_modul } = req.params
    const query = `DELETE FROM tb_modul WHERE id_modul = ?`

    const handle_delete_modul = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Delete Modul',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, [id_modul], handle_delete_modul)
}

const update_modul = async (req, res) => {
    const { nama } = req.body
    const { id_modul } = req.params

    const query = `UPDATE tb_modul SET nama_modul = ? WHERE id_modul = ?`

    const payload = [nama, id_modul]

    const handle_update_modul = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Update Modul',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, payload, handle_update_modul)
}

const controller = {
    create_modul,
    get_modul,
    delete_modul,
    update_modul
}

export default controller