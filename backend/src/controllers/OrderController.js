const conn = require('../database/conn');

module.exports = {
    async index(request, response) {
        const orders = await conn('orders').select('*');
    
        return response.json(orders);
    },

    async create(request, response) {
        const {} = request.body;

        await conn('orders').insert({

        })

        return response.json({});
    },

    async delete(request, response){
        const { id } = request.params;

        await conn('orders').where('id', id).delete();

        return response.status(204).send();
    },
}