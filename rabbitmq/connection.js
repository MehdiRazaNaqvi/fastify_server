
const amqp = require("amqplib");

const connection = async () => {


    const connection = await amqp.connect('amqp://daniyal:admin@18.189.35.210:5672');
    const channel = await connection.createChannel();

    return channel
    

}




module.exports = { connection }