import { Product } from "./product";
import { Review } from "./review";
import { Service } from "./service";
import { User } from "./user";

export interface AvailableSlot {
  start: string;
  end: string;
  owner: User;
  startMinutes: number;
  endMinutes: number;
}

export interface Location {
  _id?: string;
  id: string;
  ownerId: User;
  address: {
    type: string;
    coordinates: number[];
    country: string;
    county: string;
    city: string;
    street: string;
    number: string;
    blockApartment: string;
  };
  imageCover: {
    url: string;
    orientation: string;
  };
  products: Product[];
  employees: User[];
  services: Service[];
  minPrice: number;
  distance: number;
  review: Review;
  open: boolean;
  availableSlots: AvailableSlot[][];
  isClosingAt: number;
}
