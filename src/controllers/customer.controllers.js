/* eslint-disable import/extensions */
import StripeServices from '../services/stripe.services.js';

export const createCustomerCtrl = async (req, res, next) => {
  try {
    const results = await StripeServices.createCustomer(req.body);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const createPaymentMethod = async (req, res, next) => {
  try {
    const { id: customerId } = req.params;
    const results = await StripeServices.createPaymentMethod(req.body, customerId);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const defaultPaymentMethodCtrl = async (req, res, next) => {
  try {
    const { customer_id: customerId, payment_method_id: paymentMethodId } = req.params;
    const results = await StripeServices.defaultPaymentMethod(customerId, paymentMethodId);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const subscribeCustomerCtrl = async (req, res, next) => {
  try {
    const { customer_id: customerId, subscription_id: subscriptionId } = req.params;
    const results = await StripeServices.subscribeCustomer(customerId, subscriptionId);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const results = 2; // Ejemplo
    res.json(results);
  } catch (error) {
    next(error);
  }
};
