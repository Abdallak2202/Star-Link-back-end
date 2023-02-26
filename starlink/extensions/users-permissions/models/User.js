module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        console.log('afterCreate method called');
        const cart = await strapi.services.cart.create({
          user: result._doc.id
        });
        await strapi.query('User', 'users-permissions').update({ id: result._doc.id }, { cart: cart.id });
      }
    }
  };  