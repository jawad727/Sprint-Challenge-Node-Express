const express = require('express');

const actionRouter = require('./action-router')
const projectRouter = require('./project-router')

const server = express();

//middleware
server.use(express.json())


//Sanity check
server.get('/', (req,res) => {
    res.send(`
    <h1> working </h1>`)
})


//Routes
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)



module.exports = server 