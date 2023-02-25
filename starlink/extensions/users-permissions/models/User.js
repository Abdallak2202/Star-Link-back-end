module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        const cart = await strapi.services.cart.create({
            user: result.id
        });
        await strapi.query('User', 'users-permissions').update({ id: result.id }, { cart: cart.id });
      },
    },
  };  