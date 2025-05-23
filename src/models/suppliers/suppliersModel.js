import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  pricePerItem: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: true });

const suppliersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [productSchema]
  },
  {
    timestamps: true,
  }
);

const Suppliers = mongoose.model("Suppliers", suppliersSchema);
export default Suppliers;
