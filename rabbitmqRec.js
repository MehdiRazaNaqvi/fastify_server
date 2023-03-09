const amqp = require("amqplib");

const fastify = require("fastify")({ logger: true })

// const amqp = require('amqplib/callback_api')

const server = require("http").createServer(fastify)



const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})






amqp.connect("amqp://daniyal:admin@18.189.35.210:5672").then((conn) => {
    return conn.createChannel();
}).then(async (channel) => {



    const message = JSON.parse(messages.content.toString())


    channel.consume("group4", (messages) => {
        console.log(`Recieved ${messages.content.toString()} and room group4`);
        io.to("").emit("chat", message)
    }, { noAck: true })


    // channel.assertQueue("chat", { durable: false })
    // channel.sendToQueue("chat", Buffer.from(message), {
    //     persistent: true,
    //     headers: {
    //         'X-My-Header': 'hello world'
    //     }
    // })

    // channel.consume("chat", (messages) => { console.log(`Recieved ${messages.content}`); }, { noAck: true })





    // io.emit("chat", data)
    // io.to(room).emit("chat", data);



    // Close the channel and connection to RabbitMQ
    // return channel.close();



}).catch((err) => {
    console.error(`Error publishing message to RabbitMQ exchange ${exchange}:`, err);
});







// module.exports = { reciever }




// reciever()

const port = 5000
server.listen(port, () => {
    console.log(`server running on ${port}`)
})

