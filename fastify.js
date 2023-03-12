const fastify = require("fastify")({ logger: true })
// postgresql
// fastify.register(require('fastify-websocket'));





fastify.register(require("./routes"))



fastify.register(require('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postgresql@localhost/postgres'
})



fastify.get('/user', function (req, reply) {
    fastify.pg.query(
        'SELECT * FROM users',
        function onResult(err, result) {
            reply.send(err || result)
        }
    )
})





// fastify.addHook("onRequest", (req, res) => {
//     res.send("request comming")


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

