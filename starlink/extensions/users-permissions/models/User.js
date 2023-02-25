module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        const cart = await strapi.services.cart.create({
          user: result._doc.id
        });
        await strapi.query('User', 'users-permissions').update({ id: result._doc.id }, { cart: cart.id });
      },
    },
  };