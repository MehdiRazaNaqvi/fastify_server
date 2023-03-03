// const app = require("fastify");
const fastify = require("fastify")({ logger: true })

const server = require("http").createServer(fastify)


const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})



io.on("connection", (socket) => {
    console.log("this is socket", socket)

    socket.on("chat", (payload) => {

        console.log('this is payload', payload)
        io.emit("chat", payload)

    })


})




const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log("server running on 4000")
})