import express from 'express';
import {showCustomersController, createCustomerController,  updateCustomerController, deleteCustomerController} from '../Customer/controllers/customerControllers';

const routes = express.Router();


routes.get('/', showCustomersController);

routes.post('/', createCustomerController);

routes.put('/:id', updateCustomerController);

routes.delete('/:id', deleteCustomerController);


export default routes;
