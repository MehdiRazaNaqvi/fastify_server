


const sendMessagetoRabbit = (data, room, io, channel) => {



    const queue = `queue_${room}`;

    const message = JSON.stringify(data);


    

    channel.assertQueue(queue, { durable: true })



    channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
        headers: {
            'X-My-Header': 'hello world'
        }
    })



    channel.consume('replyQueue', (messages) => {


        // console.log(`Recieved ${messages.content.toString()} and replyQueue`);
        io.to(room).emit("chat", JSON.parse(messages.content.toString()))
        channel.ack(messages);



    }, { noAck: false });




    

    


}





module.exports = { sendMessagetoRabbit }