const conn = require('../database/conn');

module.exports = {
    async index(request, response) {
        const orders = await conn('orders').select('*');
    
        return response.json(orders);
    },

    async create(request, response) {
        const { contact, address1, address2, checkBoxes} = request.body;

        await conn('orders').insert({
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

        return response.json({contact, address1, address2, checkBoxes});
    },

    async delete(request, response){
        const { id } = request.params;

        await conn('orders').where('id', id).delete();

        return response.status(204).send();
    },
}