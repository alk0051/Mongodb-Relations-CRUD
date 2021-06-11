import { Schema, Document, model } from 'mongoose';
import { IAddress } from '../../Address/schema/address';

export interface ICustomer extends Document {
  cnpj: number;
  razaoSocial: string;
  nome: string;
  telefone: number;
  addresses: IAddress[];
}

const CustomerSchema : Schema = new Schema(
  {
    cnpj: {
      type: Number,
      required: true,
      unique: true
    },
    razaoSocial: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    addresses: [{
      type: Schema.Types.ObjectId,
      ref: 'Address',
      require: true
    }],
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


export default model<ICustomer>('Customer', CustomerSchema);