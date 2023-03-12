
// const amqp = require("amqplib");

// const fastify = require("fastify")({ logger: true })





// const { recieveMessagetoRabbit } = require("./recieveMessage")


const sendMessagetoRabbit = (data, room, io, channel) => {



    const queue = `queue_${room}`;

    const message = JSON.stringify(data);

    // console.log(`this is payload ${message}`)

    // channel.publish("chat", "", Buffer.from(message));

    channel.assertQueue(queue, { durable: true })



    channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
        headers: {
            'X-My-Header': 'hello world'
        }
    })




    // channel.publish(room, '', Buffer.from(message));



    // recieveMessagetoRabbit(queue, io, channel)




    // return channel.close();



}





module.exports = { sendMessagetoRabbit }