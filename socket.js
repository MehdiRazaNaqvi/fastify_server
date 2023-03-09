// const app = require("fastify");
const fastify = require("fastify")({ logger: true })

const amqp = require('amqplib/callback_api')

const server = require("http").createServer(fastify)

const { createChannel } = require("./channel/create")

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})



io.on("connection", (socket) => {



    amqp.connect('amqp://localhost', (err0, connection) => {
        if (err0) {
            throw err0
        }
        console.log("AMQP RUNNING...")



        createChannel(socket, connection, io)



    })



    // socket.on("chat", (payload, room) => {


    //     console.log(room)
    //     if (room) {
    //         console.log(room)

    //         io.to(room).emit("chat", payload)
    //     }
    //     else {
    //         console.log('this is payload', payload)
    //         io.emit("chat", payload)
    //     }




    // })


    socket.on("join-room", (room) => {


        socket.join(room)

        io.to(room).emit('room-joined', room)

    })


})




const port = process.env.PORT || 4000






server.listen(port, () => {
    console.log("server running on 4000")
})