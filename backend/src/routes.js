const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OrderController = require('./controllers/OrderController.js');
const PersonaController = require('./controllers/PersonaController.js');

const routes = express.Router();

routes.get('/orders', OrderController.index);
routes.post('/orders', celebrate({
    [Segments.BODY]: Joi.object().keys({

    })
}), OrderController.create);
routes.delete('/orders/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), OrderController.delete);

routes.get('/personas', PersonaController.index);
routes.post('/personas', celebrate({
    [Segments.BODY]: Joi.object().keys({

    })
}), PersonaController.create);
routes.delete('/personas/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), PersonaController.delete);

module.exports = routes;