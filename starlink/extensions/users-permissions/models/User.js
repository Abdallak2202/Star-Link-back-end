module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const { id } = result;
    
      try {
        const cart = await strapi.services.cart.create({
          total: 0,
          user: id,
        });
    
        await strapi.query('user', 'users-permissions').update(
          { id },
          { cart: cart.id }
        );
      } catch (err) {
        strapi.log.error(err);
      }
    }    
  }
};