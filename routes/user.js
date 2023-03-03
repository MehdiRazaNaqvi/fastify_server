
const data = require("../data.json")

const { getItems, postItems } = require("../controllers/users")




const routes = (fastify, options, done) => {

    fastify.get("/user", (req, res) => { res.send(data) })
    // done()

}



module.exports = routes

