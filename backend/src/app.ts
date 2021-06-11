import express from 'express';
import routes from './routes/index.routes';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocs from './swaggerDoc.json';
//import { uri } from './uri';


const app = express();

const port = process.env.PORT || 4444;


app.use(express.json())
app.use(routes);

app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const uri = 'mongodb+srv://<username>:<password>@cluster0.jqdv5.mongodb.net/teamsofttest?retryWrites=true&w=majority';

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.listen(port, () => {
  console.log(`Listen in ${port}`)
});
