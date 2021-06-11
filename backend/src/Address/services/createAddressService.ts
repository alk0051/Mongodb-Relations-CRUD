import Address, { IAddress } from '../schema/address';
import { Response } from 'express';


const createAddressService = (address: IAddress, res: Response) => {

  const newAddress = new Address(address);

  newAddress.save().then(result => {
    return res.status(201).json({ newAddress: result });
  })
  .catch(error => {
    return res.status(500).json({
    message: error.message,
    error
    });
  });
}

export default createAddressService;