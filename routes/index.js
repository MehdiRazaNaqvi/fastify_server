// const data = require("../data.json")

const { loginUser, registerUser } = require("../controllers/users")
const fastify = require("fastify")({ logger: true })

const { loginUserSchema } = require("../Schemas/user")






const getLoginOpts = {

    schema: loginUserSchema,

    handler: loginUser

};



const getRegisterOpts = {

    schema: loginUserSchema,

    handler: registerUser

};





const routes = (fastify, options, done) => {




    // fastify.get("/get", getLoginOpts)

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



    // fastify.get("/auth/login", getLoginOpts)
    // fastify.get("/auth/register", getRegisterOpts)

    fastify.get("/getdata", (req, res) => { res.send({ data: [{ name: "mehdi", age: 23, dept: "ubit" }] }) })



    // fastify.get("/get/age", (req, res) => { res.send({ age: "23" }) })
    // fastify.post("/postdata", (req, res) => { res.send({ age: "23" }) })

    // app.route("")

    done()

}

module.exports = routes




