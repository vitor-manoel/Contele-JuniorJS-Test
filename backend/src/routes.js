const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OrderController = require('./controllers/OrderController.js');

const routes = express.Router();

routes.get('/orders', OrderController.index);
routes.post('/orders', celebrate({
    [Segments.BODY]: Joi.object().keys({
        contact: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            language: Joi.string().required(),
            country: Joi.string().required(),
        }),
        address1: Joi.object().keys({
            shippingAddress1: Joi.string().required(),
            shippingAddress2: Joi.string(),
            shippingCity: Joi.string().required(),
            shippingState: Joi.string().required(),
            shippingZIPCode: Joi.string().required(),
        }),
        address2: Joi.object().keys({
            billingAddress1: Joi.string().required(),
            billingAddress2: Joi.string(),
            billingCity: Joi.string().required(),
            billingState: Joi.string().required(),
            billingZIPCode: Joi.string().required(),
        }),
        checkBoxes: Joi.object().keys({
            fuelCut: Joi.boolean().required(),
            trackersInstall: Joi.boolean().required(),
            identifyDrivers: Joi.boolean().required(),
            trackersAcquisition: Joi.number().integer().required()
        }),
    })
}), OrderController.create);
routes.delete('/orders/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), OrderController.delete);

module.exports = routes;