
// const amqp = require("amqplib");

const fastify = require("fastify")({ logger: true })





const sendMessagetoRabbit = (data, room, io, amqp) => {


    amqp.connect("amqp://daniyal:admin@18.189.35.210:5672").then((conn) => {
        return conn.createChannel();
    }).then(async (channel) => {


        const message = JSON.stringify(data);

        console.log(`this is payload ${message}`)

        // channel.publish("chat", "", Buffer.from(message));

        channel.assertQueue(room, { durable: false })



        channel.sendToQueue(room, Buffer.from(message), {
            persistent: true,
            headers: {
                'X-My-Header': 'hello world'
            }
        })




        // channel.consume(room, (messages) => {
        //     console.log(`Recieved ${messages.content.toString()} and room group4`);
        //     io.to(room).emit("chat", message)
        // }, { noAck: true })


        // channel.assertQueue("chat", { durable: false })


        // channel.consume(room, (messages) => { console.log(`Recieved ${messages.content.toString()} and room "${room}`); io.to(room).emit("chat", JSON.parse(messages.content.toString())) }, { noAck: true })




        // io.emit("chat", data)
        // io.to(room).emit("chat", data);

        // console.log(`Sent message to RabbitMQ exchange ${exchange}:`, message);

        // Close the channel and connection to RabbitMQ
        // return channel.close();

    }).catch((err) => {
        console.error(`Error publishing message to RabbitMQ exchange ${exchange}:`, err);
    });

}





module.exports = { sendMessagetoRabbit }