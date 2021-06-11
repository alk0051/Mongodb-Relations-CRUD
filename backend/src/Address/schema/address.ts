import { Schema, Document, model } from 'mongoose';
import { ICustomer } from '../../Customer/schema/customer';

export interface IAddress extends Document {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
  assignedTo: ICustomer;
  latitude: number;
  longitude: number;
}

const AddressSchema : Schema = new Schema(
  {
    logradouro : {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true
    },
    cep: {
      type: Number,
      required: true
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      require: true
    },
    latitude: {
      type: Number,
      immutable: true
    },
    longitude: {
      type: Number,
      immutable: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
)


export default model<IAddress>('Address', AddressSchema);