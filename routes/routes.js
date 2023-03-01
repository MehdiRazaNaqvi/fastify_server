

const data = require("../data.json")

const { getItems, postItems } = require("../controllers/items")

// const getItems = {

//     schema: {
//         response: {
//             200: data
//         },
//     },

//     handler: (req, res) => {
//         res.send({ data })
//     }
// }


// const getItem = {
//     schema: {
//         response: {
//             200: data
//         },

//     },
//     handler: {
//         getItems
//     }
// }


const opts = {
    schema: {
        response: {
            201:
            {
                type: 'array',
                // properties: {
                // hello: { type: 'string' }
                // }
            }
        }
    },
    handler: getItems
}


function routes(fastify, options, done) {

    fastify.get("/", opts)

    // fastify.post("/posting", postItems)

    done()

}




module.exports = routes




