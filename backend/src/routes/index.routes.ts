import * as express from 'express';
import customer from './customer.routes';
import address from './address.routes';


const routes = express.Router();

routes.use('/customers', customer);
routes.use('/addresses', address);


export default routes;