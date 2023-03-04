// const app = require("fastify");
const fastify = require("fastify")({ logger: true })
const { instrument } = require("@socket.io/admin-ui");
const server = require("http").createServer(fastify)


const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})



io.on("connection", (socket) => {
    console.log("this is socket", socket)

    socket.on("chat", (payload, room) => {


        console.log(room)
        if (room) {
            console.log(room)

            io.to(room).emit("chat", payload)
        }
        else {
            console.log('this is payload', payload)
            io.emit("chat", payload)
        }




    })


    socket.on("join-room", (room) => {


        socket.join(room)

        io.to(room).emit('room-joined', room)

    })


})




const port = process.env.PORT || 4000

instrument(io, {
    auth: false,
    mode: "development",
});



server.listen(port, () => {
    console.log("server running on 4000")
})