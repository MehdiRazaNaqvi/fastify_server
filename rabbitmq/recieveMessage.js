
const recieveMessagetoRabbit = async (queue, io, channel) => {



    channel.consume(queue, (messages) => {
        console.log(`Recieved ${messages.content.toString()} and ${queue}`);
        io.emit("chat", JSON.parse(messages.content.toString()))
        channel.ack(messages);

    }, { noAck: false, exclusive: false })






}





module.exports = { recieveMessagetoRabbit }