/* 'use strict';

const stripe = require('stripe')('sk_test_51MesrTBLqsKX5runXveXta5xnQEDwpvdBXX05GiIL83qFikCOOqSTDfnwPz9k4iMFTwpx0WXJkBfARKKrLm1MWLA002hqUOXKT');

module.exports = {
  async createCharge(amount, source, description) {
    try {
      const charge = await stripe.charges.create({
        amount: amount,
        currency: 'usd',
        source: source,
        description: description,
      });
      return charge;
    } 
    catch (e) {
      throw new Error(e.message);
    }
  },
}; */