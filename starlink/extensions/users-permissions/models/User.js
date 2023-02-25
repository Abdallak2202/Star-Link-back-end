  module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        await strapi.services.cart.create({});
        await strapi.query('user', 'users-permissions').update({ id: result.id }, { cart: cart.id });
      },
    },
  };
  