const Joi = require("joi");

const messageRules = {
    name: Joi.string().required().min(1).max(20),
    email: Joi.string().email().required().min(1).max(100).regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[A-Za-z]+)+$/),
    subject: Joi.string().required().min(1).max(100),
    message: Joi.string().min(1).max(500).required()
}

const messageSchema = Joi.object(messageRules);

export default messageSchema