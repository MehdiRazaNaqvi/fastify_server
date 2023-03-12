


const { connection } = require("./connection")

const { sendMessagetoRabbit } = require("./sendMessage")
const { createContainer, asValue, asFunction } = require('awilix');

const { io, server } = require("./socket")

const { socketListners } = require("./socketListners")


const container = createContainer();


container.register({

    amqpChannel: asFunction(() => connection),
    sendMessage: asFunction(() => sendMessagetoRabbit),




});



const app = async () => {



    const { amqpChannel, sendMessage } = container.cradle

    socketListners(io, amqpChannel(), sendMessage)



    //     console.log("connectioned")

    //     let channel = await container.cradle.amqpChannel()

    //     socket.on("join_room", (room) => {

    //         socket.join(room);

    //         io.to(room).emit('room-joined', room)

    //         const exchange = room

    //         // Declare the exchange to send messages to
    //         channel.assertExchange(exchange, "fanout", { durable: true });

    //         // Bind the exchange to a queue that corresponds to the room
    //         const queue = `queue_${room}`;
    //         channel.assertQueue(queue, { durable: true });
    //         channel.bindQueue(queue, exchange, "");



    //         // recieveMessagetoRabbit(queue, io, channel)


    //         // return channel.close().then(() => conn.close());


    //     });




    //     socket.on("chat", async (data, room) => {

    //         console.log("onchat")

    //         container.cradle.sendMessage(data, room, io, channel)



    //         channel.consume('replyQueue', (messages) => {


    //             // console.log(`Recieved ${messages.content.toString()} and replyQueue`);
    //             io.to(room).emit("chat", JSON.parse(messages.content.toString()))
    //             channel.ack(messages);



    //         }, { noAck: false });


    //     });




    //     socket.on("disconnect", () => {
    //         console.log("User Disconnected", socket.id);
    //     });



    // });

}


app()







const port = 4000


server.listen(port, () => {

    console.log(`server running on ${port}`)
})