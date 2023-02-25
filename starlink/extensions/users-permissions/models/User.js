module.exports = {
    lifecycles: {
      async afterCreate(result, data) {
        // Create a new cart for the newly created user
        await strapi.services.cart.create({
          user: result.id
        });
      }
    }
  };
  