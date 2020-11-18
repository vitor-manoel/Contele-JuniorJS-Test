/*#######################################################################
# - Função de criação da tabela 'orders' no BD :                        #
#######################################################################*/
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) { 
        table.increments('id');
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('language').notNullable();
        table.string('country').notNullable();
        table.string('shippingAddress1').notNullable();
        table.string('shippingAddress2');
        table.string('shippingCity').notNullable();
        table.string('shippingState').notNullable();
        table.string('shippingZIPCode').notNullable();
        table.string('billingAddress1').notNullable();
        table.string('billingAddress2');
        table.string('billingCity').notNullable();
        table.string('billingState').notNullable();
        table.string('billingZIPCode').notNullable();
        table.boolean('fuelCut').notNullable();
        table.boolean('trackersInstall').notNullable();
        table.boolean('identifyDrivers').notNullable();
        table.integer('trackersAcquisition').notNullable();
    });
};
/*#######################################################################
# - Função de exclusão da tabela 'orders' no BD :                        #
#######################################################################*/
exports.down = function(knex) {
    return knex.schema.dropTable('orders');
};