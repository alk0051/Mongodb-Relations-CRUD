import Customer, { ICustomer } from '../schema/customer';
import { Response } from 'express';


const createCustomerService = (customer: ICustomer, res: Response) => {

  customer.save().then(result => {
    return res.status(201).json({ newCustomer: result });
  })
  .catch(error => {
    return res.status(500).json({
    message: error.message,
    error
    });
  });
}

export default createCustomerService;