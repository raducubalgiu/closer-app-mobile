import { Filter } from "./filter";

export interface Service {
  id: string;
  name: string;
  locationsCount?: string;
  postsCount: number;
  filters?: Filter[];
}
