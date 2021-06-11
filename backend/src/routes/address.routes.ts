import express from 'express';
import {showAddressesController, createAddressController,  updateAddressController, deleteAddressController} from '../Address/controllers/addressControllers';

const routes = express.Router();


routes.get('/', showAddressesController);

routes.post('/', createAddressController);

routes.put('/:id', updateAddressController);

routes.delete('/:id', deleteAddressController);


export default routes;
