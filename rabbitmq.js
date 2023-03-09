const amqp = require("amqplib");




const fastify = require("fastify")({ logger: true })

// const amqp = require('amqplib/callback_api')

const server = require("http").createServer(fastify)
const { sendMessagetoRabbit } = require("./rabbitmq/sendMessage")

// const { reciever } = require("./rabbitmqRec")

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})







io.on("connection", (socket) => {



    socket.on("join_room", (room) => {
        socket.join(room);



        io.to(room).emit('room-joined', room)
        // Create a separate exchange for each room
        const exchange = `${room}`;


        amqp.connect("amqp://daniyal:admin@18.189.35.210:5672").then((conn) => {
            return conn.createChannel();

        })


            .then((channel) => {
                // Declare the exchange to send messages to
                channel.assertExchange(exchange, "fanout", { durable: false });

                // Bind the exchange to a queue that corresponds to the room
                const queue = `${room}`;
                channel.assertQueue(queue, { durable: false });
                channel.bindQueue(queue, exchange, "");

                // Consume messages from the queue and emit Socket.IO events to clients in the room
                // channel.consume(queue, (msg) => {
                // const data = JSON.parse(msg.content.toString());
                // io.to(room).emit("chat", data);
                // }, { noAck: true });

                // Close the channel and connection to RabbitMQ
                // return channel.close().then(() => conn.close());
            }).catch((err) => {
                console.error(`Error creating exchange and binding queue for room ${room}:`, err);
            });
    });


    socket.on("chat", (data, room) => {


        sendMessagetoRabbit(data, room, io, amqp)


        // amqp.connect("amqp://localhost").then((conn) => {
        //     return conn.createChannel();
        // }).then(async (channel) => {

        //     const message = JSON.stringify(data);
        //     // console.log(`this is payload ${message}`)

        //     // channel.publish("chat", "", Buffer.from(message)); 

        //     channel.assertQueue("chat", { durable: false })

        //     channel.sendToQueue("chat", Buffer.from(message), {
        //         persistent: true,
        //         headers: {
        //             'X-My-Header': 'hello world'
        //         }
        //     })

        //     // channel.assertQueue("chat", { durable: false })


        //     channel.consume("chat", (messages) => { console.log(`Recieved ${messages.content.toString()} and room "${room}`); io.to(room).emit("chat", JSON.parse(messages.content.toString())) }, { noAck: true })




        //     // io.emit("chat", data)
        //     // io.to(room).emit("chat", data);

        //     // console.log(`Sent message to RabbitMQ exchange ${exchange}:`, message);

        //     // Close the channel and connection to RabbitMQ
        //     // return channel.close();

        // }).catch((err) => {
        //     console.error(`Error publishing message to RabbitMQ exchange ${exchange}:`, err);
        // });




    });


    // socket.on("load_chats", (data) => {

    //     reciever()


    // })


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });



});






const port = 4000
server.listen(port, () => {
    console.log(`server running on ${port}`)
})