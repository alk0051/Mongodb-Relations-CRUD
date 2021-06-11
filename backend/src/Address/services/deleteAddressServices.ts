import Address from '../schema/address';
import { Response } from 'express';


const deleteAddress = async (id: string, res: Response) => {
  await Address.findOneAndDelete({ _id: id }).then((address) => {
    res.json(address);

  }, (err: Error) => console.error(err));
}

export default deleteAddress;