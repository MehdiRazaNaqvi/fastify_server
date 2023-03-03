// const data = require("../data.json")

const loginUser = require("../controllers/users")
const fastify = require("fastify")({ logger: true })

const { loginUserSchema } = require("../Schemas/user")


// fastify.register(require("./user"))



const getLoginOpts = {

    schema: loginUserSchema,

    handler: loginUser

};





const routes = (fastify, options, done) => {




    // fastify.get("/", (req, res) => res.send("mehdi"))

    // fastify.route({
    //     method: 'POST',
    //     url: '/postdata',
    //     schema: {


    //         querystring: {
    //             name: { type: 'string' },
    //             excitement: { type: 'integer' }
    //         },
    //         response: {
    //             200: {
    //                 type: 'object',
    //                 properties: {
    //                     hello: { type: 'string' },
    //                     city: { type: 'string' },

    //                 }
    //             }
    //         }
    //     },

    //     handler: function (request, reply) {
    //         reply.send({ hello: 'world', name: "mehdi", age: 23 })
    //     }
    // })



    fastify.post("/auth/login", getLoginOpts)


    // fastify.get("/get/age", (req, res) => { res.send({ age: "23" }) })
    // fastify.post("/postdata", (req, res) => { res.send({ age: "23" }) })

    // app.route("")

    done()

}

module.exports = routes




