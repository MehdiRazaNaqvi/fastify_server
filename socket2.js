
const fastify = require("fastify");
const fastifyIO = require("fastify-socket.io");

const server = fastify();
server.register(fastifyIO);

server.get("/", (req, reply) => {
    server.io.emit("hello");
});



server.ready().then(() => {
    // we need to wait for the server to be ready, else `server.io` is undefined
    server.io.on("connection", (socket) => {



        socket.on("chat", (payload) => {

            console.log('this is payload', payload)
            io.emit("chat", payload)

        })





    });
});



server.listen(4000);

