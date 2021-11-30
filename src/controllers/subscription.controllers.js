/* eslint-disable import/extensions */
import StripeServices from '../services/stripe.services.js';

export const createSubscriptionCtrl = async (req, res, next) => {
  try {
    const results = await StripeServices.createSubscription(req.body);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionCtrl = async (req, res, next) => {
  return 0;
}
