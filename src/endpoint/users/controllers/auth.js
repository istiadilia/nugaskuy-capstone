import { uid } from 'uid';
import { encrpyt_one_way, pairing_one_way } from '../../../utils/crypt.js'
import { create_access_token, create_refresh_token, verify_refresh_token } from '../../../utils/jwt.js'
import conn from '../../../config/index.js'

const register = async (req, res) => {
    const id_user = uid(16)
    const { nama, no_telp, asal_prov, asal_kab, email, password } = req.body

    const query_find = 'SELECT * FROM tb_user WHERE email = ?'

    const do_register = async () => {
        const encrypted_password = await encrpyt_one_way(password)
        const payload = [id_user, nama, no_telp, asal_prov, asal_kab, "not defined", email, encrypted_password]

        const query_regist = 'INSERT INTO tb_user (id_user, nama, no_telp, asal_prov, asal_kab, foto_profile, email, password) VALUE (?,?,?,?,?,?,?,?)'

        const handle_register = (error) => {
            if (!error) {
                const access_token = create_access_token(id_user, 'User');
                const refresh_token = create_refresh_token(id_user, 'User')

                res.cookie("refreshToken", refresh_token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //one day
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                })

                res.json({
                    status: 200,
                    message: `Success Register New User with email : ${email}`,
                    access_token
                })
            } else {
                res.json({
                    status: 404,
                    message: err
                })
            }
        }

        conn.query(query_regist, payload, handle_register)
    }

    const handle_check_exist = (err, result) => {
        if (!err) {
            if (result.length === 0) {
                do_register()
            } else {
                res.json({
                    status: 404,
                    message: "Email Is Already Registrated, Use Another Email"
                })
            }
        } else {
            res.json({
                status: 404,
                message: err
            })
        }
    }

    await conn.query(query_find, [email], handle_check_exist)
}

const login = async (req, res) => {
    const { email, password } = req.body
    const payload = [email]

    const query = 'SELECT * FROM tb_user WHERE email = ?'

    const handle_response = async (err, result) => {
        if (!err) {
            if (result.length > 0) {
                const hashPassword = await pairing_one_way(password.toString(), result[0].password)

                if (hashPassword) {
                    const access_token = create_access_token(result[0].id_user, 'User');
                    const refresh_token = create_refresh_token(result[0].id_user, 'User')

                    res.cookie("refreshToken", refresh_token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //one day
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    })

                    res.json({
                        status: 200,
                        message: `Success Login As User ${email}`,
                        access_token
                    })
                }
            } else {
                res.json({
                    status: 200,
                    message: "User Isn't Registered"
                })
            }
        } else {
            res.json({
                status: 404,
                message: err
            })
        }
    }

    await conn.query(query, payload, handle_response)
}

const controller = {
    register,
    login
}

export default controller