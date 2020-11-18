/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
const express = require('express');
const { celebrate } = require('celebrate');

//Controlador de ações das 'Ordens' :
const OrderController = require('./controllers/OrderController.js');

const routes = express.Router();

//Rotas para métodos HTTP :
routes.get('/orders', OrderController.index); //Listagem
routes.post('/orders', celebrate({ body: OrderController.validateStore()}), OrderController.create); //Inclusão
routes.delete('/orders/:id', celebrate({ params: OrderController.validateRemove()}), OrderController.delete); //Exclusão

module.exports = routes;