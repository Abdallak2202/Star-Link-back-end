'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async addToCart(ctx) {
        console.log("successfully entered the function");
        console.log(ctx);
        console.log(ctx.request.body);
        const { cartData } = ctx.request.body;
        console.log(cartData);
  
        // Parse the user ID from the session cookies
        const userId = ctx.session.passport.user;
        console.log(userId);
  
        // Retrieve the user's cart ID from the database
        const cart = await strapi.services.cart.findOne({ user: userId }); //id
  
        // Loop through the cartData and create a new CartProduct entry for each product
        for (const { productId, quantity } of cartData) { // not a loop, it's a single entry in cartproduct
            // Retrieve the relevant Product model for the given product ID
            const product = await strapi.services.product.findOne({ id: productId });
  
            // after I have all the services, make the create method below
            // Create a new CartProduct entry for the current product
            await strapi.services.cartproduct.create({
            cart: cart.id,
            product: product.id,
            // product would be each service
            quantity, // there's not quantity
            price: product.price,
            // Any other relevant data
          });
        }
  
        // Send a response indicating success
        ctx.send({ message: 'Cart updated successfully' });
      }
    };
  

    /* const servicio1= await.strapi.services.servicio1.findOne({
        id: servicio1.id
    }); */
    // repeat that with each service model, maybe with a try catch statement