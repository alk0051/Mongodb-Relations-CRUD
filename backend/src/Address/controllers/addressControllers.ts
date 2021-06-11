import { Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Address, { IAddress } from '../schema/address';
import createAddressService from '../services/createAddressService';
import showAddressService from '../services/showAddressesService';
import updateAddressService from '../services/updateAddressService';
import deleteAddressService from '../services/deleteAddressServices'; 
import getLatLong from '../providers/geocodeApi';


export const createAddressController = async (req: Request, res: Response) => {
  const { logradouro, complemento, bairro, cidade, estado, cep}: IAddress = req.body;

  //const uri = encodeURI(logradouro);

  const [latitude, longitude] = await getLatLong(logradouro);

  
  const address = new Address({
    _id: new mongoose.Types.ObjectId(),
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    latitude,
    longitude
  });

  createAddressService(address, res);
}


export const showAddressesController = (req: Request, res: Response) => {
  showAddressService(res);
}


export const updateAddressController = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const { logradouro, complemento, bairro, cidade, estado, cep}: IAddress = req.body;
  const [latitude, longitude] = await getLatLong(logradouro);

  if (id.length != 24) {
    return res.status(400).json({ error: "Formato de Id invalido" });
  }

  const idExist = await Address.findOne({ _id: id });

  
  if (!idExist) {
    return res.status(400).json({ error: "Id do endereço não existe." })
  }
  else {
    const address: IAddress = new Address({
      _id: id,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      latitude,
      longitude
    });
    updateAddressService(address, res);
  }
}


export const deleteAddressController = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const idExist = await Address.findOne({ _id: id });
  
  if (!idExist) {
    res.status(400).json("Id do endereço não existe.");
  }

  try {
    deleteAddressService(id, res);
  }
  catch(error) {
    console.error(error);
  }
}