import { Product } from "./product";

export interface RecommendedLocation {
  id: string;
  owner: {
    _id: string;
    name: string;
    profession: { name: string };
    username: string;
    avatar: any;
    checkmark: boolean;
    ratingsAverage: number;
    ratingsQuantity: number;
  };
  address: {
    type: number;
    coordinates: number[];
    country: string;
    county: string;
    city: string;
    street: string;
    number: string;
    blockApartment: string;
  };
  images: any;
  services: string[];
  distance: number;
  product: Product;
}
