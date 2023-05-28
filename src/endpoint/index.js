import express from "express"
import auth_user from "./users/routes/auth.js"
import auth_mentor from "./mentors/routes/auth.js"
import modul_mentor from "./mentors/routes/modul.js"
import mata_pelajaran from "./mata_pelajaran/routes/mata_pelajaran.js"
import modul from "./modul/routes/modul.js"


const endpoint = express.Router()

endpoint.get('/', (req, res) => { //welcome response endpoint
    res.json({
        status: 200,
        message: 'Welcome to Nugaskuy APP REST API',
        created_by: "nugaskuy-team-dev",
        version: "0.1 **dev**"
    })
})

endpoint.use('/user', auth_user)
endpoint.use('/mentor', auth_mentor)
endpoint.use('/mata-pelajaran', mata_pelajaran)
endpoint.use('/modul', modul)
endpoint.use('/modul-mentor', modul_mentor)

endpoint.get('*', (req, res) => { //error response endpoint
    res.send({
        status: 404,
        message: 'Inappropriate command, please read documentation or contact the administrator',
        documentation: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
})


export default endpoint