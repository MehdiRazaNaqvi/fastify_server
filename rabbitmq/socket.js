



const fastify = require("fastify")({ logger: true })



const server = require("http").createServer(fastify)







const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})







module.exports = { io, server }