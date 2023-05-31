import { uid } from 'uid';
import conn from '../../../config/index.js'
import { verify_access_token } from '../../../utils/jwt.js'

const create_modul_mentor = async (req, res) => {
    const id_modul_mentor = uid(16)
    const { id_mentor, id_modul } = req.params
    const { deskripsi_modul, biaya, durasi_sesi } = req.body
    const { authorization: raw_token } = req.headers

    const token = raw_token.split(' ')[1]

    const query = 'INSERT INTO tb_modul_mentor (id_modul_mentor, id_modul, id_mentor, deskripsi_modul, biaya, durasi_per_menit) VALUES (?,?,?,?,?,?)'

    const payload = [id_modul_mentor, id_modul, id_mentor, deskripsi_modul, biaya, durasi_sesi]

    const handle_create_modul_mentor = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Create New Modul Mentor',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    verify_access_token(token, async (error, result) => {
        if (!error) {
            if (result.id === id_mentor) {
                await conn.query(query, payload, handle_create_modul_mentor)
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

const get_modul_mentor = async (req, res) => {
    const { id_mentor, id_modul } = req.params

    const query = 'SELECT * FROM tb_modul_mentor JOIN tb_mentor ON tb_mentor.id_mentor = tb_modul_mentor.id_mentor JOIN tb_modul ON tb_modul.id_modul = tb_modul_mentor.id_modul JOIN tb_mata_pelajaran ON tb_mata_pelajaran.id_mata_pelajaran = tb_modul.id_mata_pelajaran WHERE tb_modul_mentor.id_mentor = ? AND tb_modul_mentor.id_modul = ?'

    const handle_get_modul_mentor = (err, result) => {
        if (!err) {
            if (result.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Success Get Modul List',
                    data: {
                        "id_modul_mentor": result[0].id_modul_mentor,
                        "id_mentor": result[0].id_mentor,
                        "deskripsi_modul": result[0].deskripsi_modul,
                        "biaya": result[0].biaya,
                        "durasi_sesi": result[0].durasi_per_menit,
                        "id_modul": result[0].id_modul,
                        "nama_mentor": result[0].nama,
                        "kontak_mentor": result[0].no_telp,
                        "tentang_mentor": result[0].deskripsi,
                        "foto_profile": result[0].foto_profile,
                        "email_mentor": result[0].email,
                        "nama_modul": result[0].nama_modul,
                        "id_mata_pelajaran": result[0].id_mata_pelajaran,
                        "nama_mata_pelajaran": result[0].nama_mata_pelajaran
                    }
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Mentor Tidak Memilih Modul Ini',
                    info: err
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

    await conn.query(query, [id_mentor, id_modul], handle_get_modul_mentor)
}

const delete_modul_mentor = async (req, res) => {
    const { id_modul_mentor } = req.params

    const query = `DELETE FROM tb_modul_mentor WHERE id_modul_mentor = ?`
    const query_find = `SELECT * FROM tb_modul_mentor WHERE id_modul_mentor = ?`

    const handle_delete_modul_mentor = (err, result) => {
        if (!err) {
            res.status(200).json({
                status: 200,
                message: 'Success Delete Modul Mentor',
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'failed',
                info: err
            })
        }
    }

    await conn.query(query_find, [id_modul_mentor], (err, data) => {
        verify_access_token(token, async (error, result) => {
            if (!error) {
                if (data.length > 0) {
                    if (result.id === data[0].id_mentor) {
                        await conn.query(query, [id_modul_mentor], handle_delete_modul_mentor)
                    } else {
                        return res.status(405).json({
                            status: 405,
                            message: 'unathorized',
                            info: 'token not valid'
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: 'not found',
                        info: 'Data Not Found'
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
    })
}

const update_modul_mentor = async (req, res) => {
    const { deskripsi_modul, biaya, durasi_sesi } = req.body
    const { id_modul_mentor } = req.params

    const query = `UPDATE tb_modul_mentor SET deskripsi_modul = ?, biaya = ?, durasi_per_menit = ? WHERE id_modul_mentor = ?`
    const query_find = 'SELECT * FROM tb_modul_mentor JOIN tb_mentor ON tb_mentor.id_mentor = tb_modul_mentor.id_mentor JOIN tb_modul ON tb_modul.id_modul = tb_modul_mentor.id_modul JOIN tb_mata_pelajaran ON tb_mata_pelajaran.id_mata_pelajaran = tb_modul.id_mata_pelajaran WHERE tb_modul_mentor.id_modul_mentor = ?'

    const payload = [deskripsi_modul, biaya, durasi_sesi, id_modul_mentor]

    const handle_update_modul = async (err, result) => {
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

    await conn.query(query_find, [id_modul_mentor], (error, data) => {
        verify_access_token(token, async (error, result) => {
            if (!error) {
                if (data.length > 0) {
                    if (result.id === data[0].id_mentor) {
                        await conn.query(query, payload, handle_update_modul)
                    } else {
                        return res.status(405).json({
                            status: 405,
                            message: 'unathorized',
                            info: 'token not valid'
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: 'not found',
                        info: 'Data Not Found'
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
    })
}

const controller = {
    create_modul_mentor,
    get_modul_mentor,
    delete_modul_mentor,
    update_modul_mentor,
}

export default controller