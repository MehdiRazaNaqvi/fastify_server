const amqp = require("amqplib");




const fastify = require("fastify")({ logger: true })



const server = require("http").createServer(fastify)
const { sendMessagetoRabbit } = require("./sendMessage")

const { connection } = require("./connection")
const { recieveMessagetoRabbit } = require("./recieveMessage")




const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})







io.on("connection", async (socket) => {

    const channel = await connection()



    socket.on("join_room", (room) => {

        socket.join(room);

        io.to(room).emit('room-joined', room)

        const exchange = room

        // Declare the exchange to send messages to
        channel.assertExchange(exchange, "fanout", { durable: true });

        // Bind the exchange to a queue that corresponds to the room
        const queue = `queue_${room}`;
        channel.assertQueue(queue, { durable: true });
        channel.bindQueue(queue, exchange, "");



        recieveMessagetoRabbit(queue, io, channel)


        // return channel.close().then(() => conn.close());


    });



    socket.on("chat", (data, room) => {

        sendMessagetoRabbit(data, room, io, channel)

    });




    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });



});






const port = 4000
server.listen(port, () => {
    console.log(`server running on ${port}`)
})