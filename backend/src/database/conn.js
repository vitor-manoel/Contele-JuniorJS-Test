/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
const knex = require('knex');
const configuration = require('../../knexfile');

//Definindo configuração de acesso ao BD à ser utilizada :
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//Criando objeto de conexão :
const conn = knex(config);

module.exports = conn;