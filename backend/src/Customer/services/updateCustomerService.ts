import Customer, { ICustomer } from '../schema/customer';
import { Response } from 'express';


const updateCustomerService =  async (data: ICustomer, res: Response) => {
  const filter = {_id: data.id };

  const customer = await Customer.findOneAndUpdate(filter, data, { new: true, useFindAndModify: false }, (err: Error, updatedCustomer) => {
  if (err) {
    console.error(err);
  } else {
    res.json(updatedCustomer);
  }
  });

  return customer;
}

export default  updateCustomerService;