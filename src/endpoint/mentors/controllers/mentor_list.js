import conn from '../../../config/index.js'

const get_available_mentor = async (req, res) => {
    const { id_modul } = req.params

    const query = "SELECT tb_modul_mentor.id_mentor, tb_modul_mentor.id_modul, tb_mentor.nama, COUNT(tb_jadwal.id_mentor) FROM tb_modul_mentor JOIN tb_mentor ON tb_modul_mentor.id_mentor = tb_mentor.id_mentor JOIN tb_modul ON tb_modul_mentor.id_modul = tb_modul.id_modul WHERE tb_modul.id_modul = ? AND tb_jadwal.status_ketersediaan = 'available'"

    const payload = [id_modul]

    const handle_get_jadwal = (err, result) => {
        if (!err) {
            return res.status(200).json({
                status: 200,
                message: 'Success Get Jadwal List',
                data: result
            })
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

const controller = {
    get_available_mentor,
}

export default controller