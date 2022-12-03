import { Filter } from "./filter";

export interface Service {
  _id: string;
  name: string;
  categoryName?: string;
  locationsCount?: string;
  postsCount: number;
  filters: Filter[];
}
