/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
import Stripe from 'stripe';

let stripe = false;

export default class StripeServices {
  static async createSubscription(subscription) {
    stripe = Stripe(`${process.env.STRIPE_SECRET}`);
    const { name, description, unit_amount } = subscription;
    try {
      const product = await stripe.products.create({
        name,
        description,
      });

      const price = await this.stripe.prices.create({
        unit_amount,
        currency: 'mxn',
        recurring: { interval: 'month' },
        product: product.id,
      });

      return {
        product,
        price,
      };
    } catch (error) {
      throw error;
    }
  }

  static async createCustomer(customerObj) {
    stripe = Stripe(`${process.env.STRIPE_SECRET}`);
    const { name, email, city, state, country, postal_code, line1, line2 } =
      customerObj;
    try {
      const customer = await stripe.customers.create({
        name,
        email,
        address: {
          city,
          state,
          country,
          postal_code,
          line1,
          line2,
        },
      });
      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async createPaymentMethod(paymentMethodObj, customerId) {
    stripe = Stripe(`${process.env.STRIPE_SECRET}`);
    const { number, exp_month, exp_year, cvc } = paymentMethodObj;
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number,
          exp_month,
          exp_year,
          cvc,
        },
      });

      const attachPaymentMethod = await stripe.paymentMethods.attach(
        paymentMethod.id,
        { customer: customerId },
      );
      return {
        paymentMethod,
        attachPaymentMethod,
      };
    } catch (error) {
      throw error;
    }
  }

  static async defaultPaymentMethod(customerId, paymentMethodId) {
    stripe = Stripe(`${process.env.STRIPE_SECRET}`);

    try {
      const customer = await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async subscribeCustomer(customerId, subscriptionId) {
    stripe = Stripe(`${process.env.STRIPE_SECRET}`);

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: subscriptionId }],
      });

      return subscription;
    } catch (error) {
      throw error;
    }
  }
}
