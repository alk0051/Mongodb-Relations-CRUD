import Customer from '../schema/address';
import { Request, Response } from 'express';

const showAddressesService = (res: Response) => {
  Customer.find()
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

export default showAddressesService;