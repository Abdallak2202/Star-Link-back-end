'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async addToCart(ctx) {
        try {
            console.log("successfully entered the function");
    
            const { cookies, cartData } = ctx.request.body;
            console.log("COOKIES", cookies);
            console.log("CART DATA", cartData);

            // Retrieve the unique services only, to avoid product duplication
            const cartSet= Array.from(new Set(cartData.map(JSON.stringify)), JSON.parse);
            console.log("CART SET", cartSet);
      
            // Parse the user ID from the session cookies
            const userId = cookies.id;
            console.log("USER ID", userId);
      
            // Retrieve the user's cart from the database
            const cart = await strapi.services.cart.findOne({ user: userId });
            console.log("CART", cart);
    
            // Define the services the entry might have
            var cloudServers=[];
            var dedicatedServers=[];
            var domains=[];
            var housings=[];
    
            // Define the total the cart will have
            var total=[];
    
            // Introduce the products id in their respective array
            // And push the prices in the total array
            for (let i=0; i<cartSet.length; i++) {
                if (cartSet[i].service==="Cloud Server") {
                    cloudServers.push(cartSet[i].id);
                    total.push(cartSet[i].price);
                }
                else if (cartSet[i].service==="Dedicated Server") {
                    dedicatedServers.push(cartSet[i].id);
                    total.push(cartSet[i].price);
                }
                else if (cartData[i].service==="Domain") {
                    domains.push(cartSet[i].id);
                    total.push(cartSet[i].price);
                }
                else if (cartData[i].service==="Housing") {
                    housings.push(cartSet[i].id);
                    total.push(cartSet[i].price);
                }
            }
    
    ///////////////////////////////////////////////////////////////////////////
            // Log the products id to check
            console.log("CLOUD SERVERS", cloudServers);
            console.log("DEDICATED SERVERS", dedicatedServers);
            console.log("DOMAINS", domains);
            console.log("HOUSINGS", housings);
    ///////////////////////////////////////////////////////////////////////////
    
            // Calculate the total price for all the products
            var totalCart= total.reduce((acc, current) => {
                return acc+current;
            });
            console.log("TOTAL CART", totalCart);
    
            // Update the cart with the total price
            const cartReady= await strapi.query('cart').update({ id: cart.id }, { total: totalCart });
            console.log("CART READY", cartReady);
    
    
            // Create an entry in the join table (the cart with its services)
            await strapi.services.cartproduct.create({
                cloud_servers: cloudServers,
                dedicated_servers: dedicatedServers,
                domains: domains,
                housings: housings,
                cart: cart.id,
            })
    
    
            ctx.send({ message: 'Cart updated successfully' });
            
          }
        catch(e) {
            console.log(e);
            ctx.response.status = 500;
            ctx.response.body = { error: "Internal server error..." };
        }
    }};