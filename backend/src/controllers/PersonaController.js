const conn = require('../database/conn');

module.exports = {
    async index(request, response) {
        const personas = await conn('personas').select('*');
    
        return response.json(personas);
    },

    async create(request, response) {
        const {} = request.body;

        await conn('personas').insert({

        })

        return response.json({});
    },

    async delete(request, response){
        const { id } = request.params;

        await conn('personas').where('id', id).delete();

        return response.status(204).send();
    },
}