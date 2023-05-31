import { uid } from 'uid';
import conn from '../../../config/index.js'
import { verify_access_token } from '../../../utils/jwt.js'

const create_jadwal = async (req, res) => {
    const id_jadwal = uid(16)
    const { id_mentor } = req.params
    const { authorization: raw_token } = req.headers
    const { hari, jam } = req.body

    const token = raw_token.split(' ')[1]

    const query = 'INSERT INTO tb_jadwal (id_jadwal, id_mentor, hari, jam,status_ketersediaan) VALUES (?,?,?,?,?)'

    const payload = [id_jadwal, id_mentor, hari, jam, 'available']

    const handle_create_jadwal = (err, result) => {
        if (!err) {
            return res.status(200).json({
                status: 200,
                message: 'Success Create Jadwal',
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    verify_access_token(token, async (error, result) => {
        if (!error) {
            if (result.id === id_mentor) {
                await conn.query(query, payload, handle_create_jadwal)
            } else {
                return res.status(405).json({
                    status: 405,
                    message: 'unathorized',
                    info: 'token not valid'
                })
            }
        } else {
            return res.status(405).json({
                status: 403,
                message: 'unathorized',
                info: 'token not found'
            })
        }
    })
}

const get_jadwal = async (req, res) => {
    const { id_mentor } = req.params
    const { status } = req.query

    let query = "SELECT * FROM tb_jadwal JOIN tb_mentor ON tb_jadwal.id_mentor = tb_mentor.id_mentor"

    if (status) {
        query = query + " WHERE status_ketersediaan = 'available'"
    }

    const payload = [id_mentor]

    const handle_get_jadwal = (err, result) => {
        if (!err) {
            if (result.length > 0) {
                const data = result.map((each) => {
                    return {
                        id_jadwal: each.id_jadwal,
                        id_mentor: each.id_mentor,
                        hari: each.hari,
                        jam: each.jam,
                        status_ketersediaan: each.status_ketersediaan,
                        nama: each.nama,
                        no_telp: each.no_telp,
                        deskripsi: each.deskripsi,
                        foto_profile: each.foto_profile,
                        email: each.email,
                    }
                })
                return res.status(200).json({
                    status: 200,
                    message: `Success Get Jadwal List ${result[0].nama}`,
                    data: data
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    message: `Mentor Belum Mengatur Jadwal`,
                    data: []
                })
            }

        } else {
            return res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query, payload, handle_get_jadwal)
}

const edit_jadwal = async (req, res) => {
    const { id_jadwal } = req.params
    const { authorization: raw_token } = req.headers
    const { hari, jam } = req.body

    const token = raw_token.split(' ')[1]

    const query = 'UPDATE tb_jadwal SET hari = ?, jam = ? WHERE id_jadwal = ?'
    const query_find = 'SELECT * FROM tb_jadwal WHERE id_jadwal = ?'

    const payload = [hari, jam, id_jadwal]

    const handle_update_jadwal = (err, result) => {
        if (!err) {
            return res.status(200).json({
                status: 200,
                message: 'Success Update Jadwal',
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query_find, [id_jadwal], (err, data) => {
        console.log(data)
        if (!err) {
            verify_access_token(token, async (error, result) => {
                if (!error) {
                    if (result.id === data[0].id_mentor) {
                        await conn.query(query, payload, handle_update_jadwal)
                    } else {
                        return res.status(405).json({
                            status: 405,
                            message: 'unathorized',
                            info: 'token not valid'
                        })
                    }
                } else {
                    return res.status(405).json({
                        status: 403,
                        message: 'unathorized',
                        info: 'token not found'
                    })
                }

            })
        } else {
            return res.status(400).json({
                status: 403,
                message: 'not found',
                info: 'no record found'
            })
        }
    })
}

const delete_jadwal = async (req, res) => {
    const { id_jadwal } = req.params
    const { authorization: raw_token } = req.headers

    const token = raw_token.split(' ')[1]

    const query = 'DELETE FROM tb_jadwal WHERE id_jadwal = ?'
    const query_find = 'SELECT * FROM tb_jadwal WHERE id_jadwal = ?'

    const payload = [id_jadwal]

    const handle_delete_jadwal = (err, result) => {
        if (!err) {
            return res.status(200).json({
                status: 200,
                message: 'Success Delete Jadwal',
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query_find, payload, (err, data) => {
        if (!err) {
            verify_access_token(token, async (error, result) => {
                if (!error) {
                    if (result.id === data[0].id_mentor) {
                        await conn.query(query, payload, handle_delete_jadwal)
                    } else {
                        return res.status(405).json({
                            status: 405,
                            message: 'unathorized',
                            info: 'token not valid'
                        })
                    }
                } else {
                    return res.status(405).json({
                        status: 403,
                        message: 'unathorized',
                        info: 'token not found'
                    })
                }
            })
        } else {
            return res.status(400).json({
                status: 403,
                message: 'not found',
                info: 'no record found'
            })
        }
    })
}

const controller = {
    create_jadwal,
    get_jadwal,
    edit_jadwal,
    delete_jadwal
}

export default controller