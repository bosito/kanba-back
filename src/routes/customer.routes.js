import { Router } from 'express';

// eslint-disable-next-line import/extensions
import {
  createCustomerCtrl,
  createPaymentMethod,
  defaultPaymentMethodCtrl,
  subscribeCustomerCtrl
} from '../controllers/customer.controllers.js';

const routes = Router();

routes.post('/customers', createCustomerCtrl);
routes.post('/customers/:id/payment-method', createPaymentMethod);
routes.put('/customers/:customer_id/payment-method/:payment_method_id', defaultPaymentMethodCtrl);
routes.post('/customers/:customer_id/subscribe/:subscription_id', subscribeCustomerCtrl);

export default routes;
