
const { connection } = require("./connection")

const recieveMessagetoRabbit = async () => {


    const channel = await connection()



    channel.consume("queue_testing..", (messages) => {

        console.log(`Recieved ${messages.content.toString()} and queue_testing..`);
        // io.emit("chat", JSON.parse(messages.content.toString()))
        channel.ack(messages);


        channel.assertQueue("replyQueue", { durable: true })
        // channel.sendToQueue("replyQueue", Buffer.from(messages.content.toString()));



        channel.sendToQueue("replyQueue", Buffer.from(messages.content.toString()), {
            persistent: true,
            headers: {
                'X-My-Header': 'hello world'
            }
        })


    }, { noAck: false });



    // }, { noAck: false, exclusive: false })






}

recieveMessagetoRabbit()



// module.exports = { recieveMessagetoRabbit }




