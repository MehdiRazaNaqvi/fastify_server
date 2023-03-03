const fastify = require("fastify")({ logger: true })

// fastify.register(require('fastify-websocket'));



fastify.register(require("./routes"))

// fastify.addHook("onRequest", (req, res) => {
//     res.send("mehdi")


// })



// fastify.addHook('preValidation', (request, reply, done) => {
//     // console.log(request.body)
//     request.body = { ...request.body, importantKey: 'randomString' }
//     done()
//     reply.send(request.body)

// })









const start = async () => {
    try {
        await fastify.listen(5000)

    }
    catch (error) {
        fastify.log.error(error)
        process.exit(1)

    }
}


start()

