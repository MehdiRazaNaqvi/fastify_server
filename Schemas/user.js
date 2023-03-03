const loginUserSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {

            email: { type: String },
            password: { type: String },
        },
    },
    response: {
        200: { type: String },
    },
};



module.exports = loginUserSchema 