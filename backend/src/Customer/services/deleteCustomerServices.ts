import Customer from '../schema/customer';
import { Response } from 'express';


const deleteCostumer = async (id: string, res: Response) => {
  await Customer.findOneAndDelete({ _id: id }).then((customer) => {
    res.json(customer);

  }, (err: Error) => console.error(err));
}

export default deleteCostumer;