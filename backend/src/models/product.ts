import mongoose, { Schema, Document, Model } from "mongoose";

interface ProductOption {
  optionCategory: string;
  optionName: string;
}

interface IReivew {
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
}

interface IProduct extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: Schema.Types.ObjectId[];
  mainCategory: string[];
  category: string[];
  subCategory?: string[];
  options?: ProductOption[];
  reviews?: IReivew[];
  rating: number;
  availableOnline: boolean;
  productUrl?: string;
  ships: boolean;
  pickupAvailable: boolean;
  inShopOnly: boolean;
}

const ProductOptionSchema: Schema = new Schema({
  optionCategory: { type: String, required: true },
  optionName: { type: String, required: true },
});
const ReviewSchema: Schema<IReivew> = new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    location: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    mainCategory: { type: [String], required: true },
    category: { type: [String], required: true },
    subCategory: { type: [String] },
    options: { type: [ProductOptionSchema] },
    reviews: { type: [ReviewSchema] },
    rating: { type: Number, default: 0 },
    availableOnline: { type: Boolean, default: false },
    productUrl: { type: String },
    ships: { type: Boolean, default: false },
    pickupAvailable: { type: Boolean, default: false },
    inShopOnly: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export default Product;
