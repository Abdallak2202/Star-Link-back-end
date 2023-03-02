"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")("sk_test_51MesrTBLqsKX5runXveXta5xnQEDwpvdBXX05GiIL83qFikCOOqSTDfnwPz9k4iMFTwpx0WXJkBfARKKrLm1MWLA002hqUOXKT");

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    console.log("ENTERED THE FUNCTION");
    console.log("CTX.REQUEST.BODY", ctx.request.body);
    const { address, amount, products, token, city, state } = JSON.parse(
      ctx.request.body
    );
    //const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: amount*100,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      products,
      city,
      state,
    });

    return order;
  },
};