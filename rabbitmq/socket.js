

const amqp = require("amqplib");




const fastify = require("fastify")({ logger: true })



const server = require("http").createServer(fastify)
const { sendMessagetoRabbit } = require("./sendMessage")

const { connection } = require("./connection")
// const { recieveMessagetoRabbit } = require("./recieveMessage")

const { createContainer, asClass, asValue, asFunction } = require('awilix');




const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})







module.exports = { io, server }