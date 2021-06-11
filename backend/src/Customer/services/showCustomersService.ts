import Customer from '../schema/customer';
import { Request, Response } from 'express';

const showCustomersService = (res: Response) => {
  Customer.find()
  .populate(['customer', 'addresses'])
  .exec()
  .then((results) => {
    return res.status(200).json({
      customers: results,
      count: results.length
    });
  })
  .catch((error: Error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  });
  
};

export default showCustomersService;