import Address, { IAddress } from '../schema/address';
import { Response } from 'express';


const updateAddressService =  async (data: IAddress, res: Response) => {
  const filter = {_id: data.id };

  await Address.findOneAndUpdate(filter, data, { new: true, useFindAndModify: false }, (err: Error, updatedAddress) => {
  if (err) {
    console.error(err);
  } else {
    res.json(updatedAddress);
  }
  });
}

export default  updateAddressService;