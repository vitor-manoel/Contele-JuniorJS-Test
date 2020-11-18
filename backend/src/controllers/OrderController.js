/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
const conn = require('../database/conn');
const { Joi } = require('celebrate');

module.exports = {
    /*#######################################################################
    # - Função de listagem do método GET : (retorno de [] no formato JSON)  #
    #######################################################################*/
    async index(request, response) {
        const orders = await conn('orders').select('*');
    
        return response.json(orders);
    },

    /*#######################################################################
    # - Função de validação dos dados vindo do POST :                       #
    #######################################################################*/
    validateStore(){
        const schema = Joi.object().keys({
            contact: Joi.object().keys({ //Validação de informações de contato :
                firstName: Joi.string() //Validação do campo Primeiro Nome
                    .trim()
                    .min(3)
                    .max(16)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                lastName: Joi.string() //Validação do campo Segundo Nome
                    .trim()
                    .min(3)
                    .max(16)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                email: Joi.string() //Validação do campo Email
                    .min(5)
                    .max(30)
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                phone: Joi.string() //Validação do campo Telefone
                    .min(8)
                    .max(16)
                    .regex(/^[0-9()+-]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                language: Joi.string() //Validação do campo Língua
                    .min(2)
                    .max(6)
                    .regex(/^[a-záàâãéèêíïóôõöúçñ-]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                country: Joi.string() //Validação do campo País
                    .max(2)
                    .min(2)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
            }),
    
            address1: Joi.object().keys({ //Validação de informações do Endereço de Remessa :
                shippingAddress1: Joi.string() //Validação do campo Endereço1
                    .trim()
                    .min(5)
                    .max(40)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                shippingAddress2: Joi.string() //Validação do campo Endereço2
                    .max(40)
                    .messages({
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                    }),
                shippingCity: Joi.string() //Validação do campo Cidade
                    .trim()
                    .min(2)
                    .max(40)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                shippingState: Joi.string() //Validação do campo Estado
                    .trim()
                    .min(2)
                    .max(40)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                shippingZIPCode: Joi.string() //Validação do campo CEP
                    .min(2)
                    .max(20)
                    .regex(/^[0-9-]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
            }),
    
            address2: Joi.object().keys({ //Validação de informações do Endereço de Faturamento :
                billingAddress1: Joi.string() //Validação do campo Endereço1
                    .trim()
                    .min(5)
                    .max(40)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                billingAddress2: Joi.string() //Validação do campo Endereço2
                    .max(40)
                    .messages({
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                    }),
                billingCity: Joi.string() //Validação do campo Cidade
                    .trim()
                    .min(2)
                    .max(40)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                billingState: Joi.string() //Validação do campo Estado
                    .trim() 
                    .min(2)
                    .max(40)
                    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
                billingZIPCode: Joi.string() //Validação do campo CEP
                    .min(2)
                    .max(20)
                    .regex(/^[0-9-]+$/)
                    .required()
                    .messages({
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'string.max': `{#label} should have a maximum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
            }),
    
            checkBoxes: Joi.object().keys({ //Validação das caixas de seleção :
                fuelCut: Joi.boolean() //Validação do check Corte de Combustível
                    .required()
                    .messages({
                        'any.required': `{#label} is a required field`
                    }),
                trackersInstall: Joi.boolean() //Validação do check Rastreadores
                    .required()
                    .messages({
                        'any.required': `{#label} is a required field`
                    }),
                identifyDrivers: Joi.boolean() //Validação do check Identificar Condutores
                    .required()
                    .messages({
                        'any.required': `{#label} is a required field`
                    }),
                trackersAcquisition: Joi.number() //Validação do campo Aquisição de Rastreadores
                    .integer()
                    .min(1)
                    .max(100)
                    .required()
                    .messages({
                        'integer.min': `{#label} should have a minimum value of {#limit}`,
                        'integer.max': `{#label} should have a maximum value of {#limit}`,
                        'any.required': `{#label} is a required field`
                    }),
            }),
        })
        return(schema); //Retorno do esquema de validação
    },

    /*#######################################################################
    # - Função de inserção dos dados validados no BD :                      #
    #######################################################################*/
    async create(request, response) {
        const { contact, address1, address2, checkBoxes } = request.body;

        await conn('orders').insert({ //Abrir conexão e alimentar dados da query
            /*Foi pensado em dividir em mais de uma tabela, porém devido falta de tempo
            infelizmente não foi possível implementar da melhor maneira.*/
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            language: contact.language,
            country: contact.country,
            
            shippingAddress1: address1.shippingAddress1,
            shippingAddress2: address1.shippingAddress2,
            shippingCity: address1.shippingCity,
            shippingState: address1.shippingState,
            shippingZIPCode: address1.shippingZIPCode,

            billingAddress1: address2.billingAddress1,
            billingAddress2: address2.billingAddress2,
            billingCity: address2.billingCity,
            billingState: address2.billingState,
            billingZIPCode: address2.billingZIPCode,
            
            fuelCut: checkBoxes.fuelCut,
            trackersInstall: checkBoxes.trackersInstall,
            identifyDrivers: checkBoxes.identifyDrivers,
            trackersAcquisition: checkBoxes.trackersAcquisition
        })
        //Retorno das informações inseridas
        return response.json({contact, address1, address2, checkBoxes});
    },
    /*#######################################################################
    # - Função de validação dos dados vindo do DELETE :                     #
    #######################################################################*/
    validateRemove() {
        const schema = Joi.object().keys({
            id: Joi.number().required() //Validação da ID
        });
        return(schema);
    },

    /*#######################################################################
    # - Função de remoção de linha por ID no BD :                           #
    #######################################################################*/
    async delete(request, response){
        const { id } = request.params; //Obtendo ID enviado

        await conn('orders').where('id', id).delete(); //Abrindo conexão e definindo query

        return response.status(204).send(); //Retornando msg de sucesso
    },
}