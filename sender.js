
var amqp = require('amqplib/callback_api');







amqp.connect('amqp://localhost', function (error0, connection) {


    if (error0) {
        throw error0;
    }


    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from("queueee"));


    });


    
});