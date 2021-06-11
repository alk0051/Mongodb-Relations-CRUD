import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Customer, { ICustomer } from '../schema/customer';
import Address, { IAddress } from '../../Address/schema/address';
import createCustomerService from '../services/createCustomerService';
import showCustomersService from '../services/showCustomersService';
import updateCustomerService from '../services/updateCustomerService';
import deleteCustomerService from '../services/deleteCustomerServices'; 
import getLatLong from '../../Address/providers/geocodeApi';


export const createCustomerController = async (req: Request, res: Response) => {
  const { cnpj, razaoSocial, nome, telefone, addresses}: ICustomer = req.body;

  const cnpjExists = await Customer.findOne({ cnpj: req.body.cnpj });

  if (cnpjExists) {
    return res.status(400).json({ error: "CNPJ já esta cadastrado." });
  }
  if (cnpj.toString().length != 14) {
    return res.status(400).json({ error: "Cnpj invalido." });
  }
  
  try {
    const customer = new Customer({
      _id: new mongoose.Types.ObjectId(),
      cnpj,
      razaoSocial,
      nome,
      telefone,
    });
    createCustomerService(customer, res);
  
    await Promise.all(addresses.map(async address => {

      //const uri = encodeURI(address.logradouro);

      [address.latitude, address.longitude] = await getLatLong(address.logradouro);

      const customerAddress = new Address({ ...address, assignedTo: customer._id });

      await customerAddress.save();
    
      customer.addresses.push(customerAddress);
    }));

    await customer.save();
  
    return res.send({ customer });
  }
  catch(err) {
    console.error(err);
  }
}


export const showCustomersController = (req: Request, res: Response) => {
  showCustomersService(res);
}


export const updateCustomerController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { cnpj, razaoSocial, nome, telefone, addresses}: ICustomer = req.body;

  if (id.length != 24) {
    return res.status(400).json({ error: "Formato de Id invalido" });
  }

  const idExist = await Customer.findOne({ _id: id });
  
  if (!idExist) {
    return res.status(400).json({ error: "Id do cliente não existe." })
  }

  const cnpjExists = await Customer.findOne({ cnpj: req.body.cnpj });

  if (cnpjExists) {
    return res.status(400).json({ error: "CNPJ já esta cadastrado." });
  }
  if (cnpj.toString().length != 14) {
    return res.status(400).json({ error: "Cnpj invalido." });
  }

  else {
    try {

      const data: ICustomer = new Customer({
        _id: id,
        cnpj,
        razaoSocial,
        nome,
        telefone
      });
      updateCustomerService(data, res);

      const customer = await Customer.findOne({ _id: id });

      
      if (customer) {
        customer.addresses = [];
        await Address.deleteMany({ assignedTo: customer._id });

        await Promise.all(addresses.map(async address => {
          [address.latitude, address.longitude] = await getLatLong(address.logradouro);

          const customerAddress = new Address({ ...address, assignedTo: customer._id });

          await customerAddress.save();

          customer.addresses.push(customerAddress);
      
        }));

        await customer.save();
      }
      return res.send({ customer });
    }
    catch(err) {
      //res.status(400).json({ error: err })
      console.error(err);
    }
  }
}


export const deleteCustomerController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const idExist = await Address.findOne({ _id: id });
  
  if (!idExist) {
    res.status(400).json("Id do endereço não existe.");
  }

  try {
    deleteCustomerService(id, res);
  }
  catch(error) {
    console.error(error);
  }
}