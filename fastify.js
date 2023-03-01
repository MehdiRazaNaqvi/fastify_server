const fastify = require("fastify")({ logger: true })




fastify.register(require("./routes/routes"))




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

