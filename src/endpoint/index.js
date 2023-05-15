import express from "express"

const endpoint = express.Router()

endpoint.get('/', (req, res) => { //welcome response endpoint
    res.json({
        status: 200,
        message: 'Welcome to Nugaskuy APP REST API',
        created_by: "nugaskuy-team-dev",
        version: "0.1 **dev**"
    })
})

endpoint.get('*', (req, res) => { //error response endpoint
    res.send({
        status: 404,
        message: 'Inappropriate command, please read documentation or contact the administrator',
        documentation: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
})


export default endpoint